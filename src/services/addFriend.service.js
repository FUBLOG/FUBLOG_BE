"use strict";

const User = require('../model/user.model');
const { isMongoId } = require('validator');
const userInfor = require('../model/userInfo.model');
const addFriendRepo = require('../repository/addFriend.repo')
const {NotFoundError,ConflictRequestError} = require("../core/response/error.response")
const users = require ("../model/user.model");
const { log } = require('../logger/log.system');

class addFriendService {
    static sendFriendRequest = async (sourceID, targetID) => {
        if (!isMongoId(sourceID) || !isMongoId(targetID)) {
            throw new NotFoundError('invalid userID');
        }
    
        const sender = await User.findById(sourceID);
        const receiver = await User.findById(targetID);
    
        if (!sender || !receiver) {
            throw new NotFoundError('user not found');
        }
            
        const existingRequest = await addFriendRepo.findRequest(sourceID, targetID);
        if (existingRequest && existingRequest.status === "pending") {
            throw new ConflictRequestError('already sent');
        }
        if (existingRequest && existingRequest.status === 'accepted') {
            throw new ConflictRequestError('You are already friends');
        }

        if (existingRequest && existingRequest.status === 'declined') {
            throw new ConflictRequestError('Friend request was declined');
        }

        const createdRequest = await addFriendRepo.createRequest(sourceID, targetID);
        return createdRequest;

    };
    
    static acceptFriendRequest = async (sourceID, targetID) => {
        if (!isMongoId(sourceID) || !isMongoId(targetID)) {
            throw new NotFoundError('invalid userID');
        }  
        const existingRequest = await addFriendRepo.findRequest(sourceID, targetID); 
        if (!existingRequest) {          
            throw new NotFoundError('friend request not found or already processed');
        }
        if (existingRequest.status === 'pending'){
            const senderInfo = await userInfor.findOne({ user_id: sourceID });
            const receiverInfo = await userInfor.findOne({ user_id: targetID });
            const receiver = await users.findOne({ _id: targetID })
            const sender = await users.findOne({ _id: sourceID })
        
            if (!senderInfo.friendList.find(friend => friend.friend_id.equals(targetID))) {
                senderInfo.friendList.push({
                    friend_id: targetID,
                    displayName: receiver.displayName,
                    avatar: receiverInfo.avatar,
                    profileHash: receiver.profileHash
                });
                await senderInfo.save();
            }
        
            if (!receiverInfo.friendList.find(friend => friend.friend_id.equals(sourceID))) {
                receiverInfo.friendList.push({
                    friend_id: sourceID,
                    displayName: sender.displayName,
                    avatar: senderInfo.avatar,
                    profileHash: sender.profileHash
                });
                await receiverInfo.save();
            }
            
            await addFriendRepo.updateRequestStatus(sourceID, targetID, "accepted");
            await addFriendRepo.findRequest(sourceID, targetID);
           // await addFriendRepo.deleteRequest(sourceID,targetID)
            return {
                friend_id: targetID,
                displayName: receiver.displayName,
                avatar: receiverInfo.avatar,
                profileHash: receiver.profileHash
            };
        }
        
    };
    
    
    
   
    static getAllFriendRequests = async (sourceID) => {

        if (!isMongoId(sourceID)) {
            throw new NotFoundError('Invalid userID');
        }
        const getRequest = await addFriendRepo.findAllRequests(sourceID, 'pending');

        return getRequest;
    };

  static declineFriendRequest = async (sourceID, targetID) => {
        if (!isMongoId(sourceID) || !isMongoId(targetID)) {
            throw new NotFoundError('invalid userID');
        }
        const existingRequest = await addFriendRepo.findRequest(sourceID, targetID);   
        if (!existingRequest || existingRequest.status !== 'pending') {
            throw new NotFoundError('friend request not found or already processed');
        }
        const deletedRequest = await addFriendRepo.deleteRequest(sourceID, targetID,"pending");
        await addFriendRepo.updateRequestStatus(sourceID, targetID, "declined");
        return deletedRequest;
    };

    static unFriend = async (sourceID, targetID) => {
        if (!isMongoId(sourceID) || !isMongoId(targetID)) {
            throw new NotFoundError('Invalid userID');
        }
    
        const existingRequest = await addFriendRepo.findRequest(sourceID, targetID);
 ;
        if (!existingRequest || existingRequest.status !== 'accepted') {
            throw new NotFoundError('Friend request not found or not a friend');
        }
    
        const senderInfo = await userInfor.findOne({ user_id: sourceID });
        const receiverInfo = await userInfor.findOne({ user_id: targetID });
    
        if (senderInfo.friendList.find(friend => friend.friend_id.equals(targetID))) {
            senderInfo.friendList = senderInfo.friendList.filter(friend => !friend.friend_id.equals(targetID));
            await senderInfo.save();
        }
    
        if (receiverInfo.friendList.find(friend => friend.friend_id.equals(sourceID))) {
            receiverInfo.friendList = receiverInfo.friendList.filter(friend => !friend.friend_id.equals(sourceID));
            await receiverInfo.save();
        }
        await addFriendRepo.updateRequestStatus(sourceID, targetID, 'declined');
        const deletedRequest = await addFriendRepo.deleteRequest(sourceID, targetID,);
        
        return deletedRequest;
    };

    static blockFriend = async (sourceID, targetID) => {
        if (!isMongoId(sourceID) || !isMongoId(targetID)) {
            throw new NotFoundError('Invalid userID');
        }
    
        const existingRequest = await addFriendRepo.findRequest(sourceID, targetID);
        console.log(existingRequest);
        if (!existingRequest || existingRequest.status !== 'accepted') {
             throw new NotFoundError('Friend request not found or not a friend');
        }

        const senderInfo = await userInfor.findOne({ user_id: sourceID });
        const receiverInfo = await userInfor.findOne({ user_id: targetID });
    
        const sender = await users.findOne({ _id: sourceID });
    
        if (!receiverInfo.blockList.find(friend => friend.friend_id.equals(sourceID))) {
            receiverInfo.blockList.push({
                friend_id: sourceID,
                displayName: sender.displayName,
                avatar: senderInfo.avatar,
                profileHash: sender.profileHash
            });
            await receiverInfo.save();
        }
    
        await addFriendRepo.updateRequestStatus(sourceID, targetID, 'declined');
        const deletedRequest = await addFriendRepo.deleteRequest(sourceID, targetID);
    
        return {
            friend_id: sourceID,
            displayName: sender.displayName,
            avatar: senderInfo.avatar,
            profileHash: sender.profileHash
        };
    };
    static checkFriendRequest = async (sourceID, targetID) => {
        if (!isMongoId(sourceID) || !isMongoId(targetID)) {
            throw new NotFoundError('Invalid userID');
        }

        const existingRequest = await addFriendRepo.findRequest(sourceID, targetID);

        if (existingRequest) {
            return existingRequest;
        } else {
            return null;
        }
    };

}


module.exports = addFriendService;