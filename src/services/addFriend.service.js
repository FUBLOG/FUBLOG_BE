"use strict";

const User = require('../model/user.model');
const { isMongoId } = require('validator');
const userInfor = require('../model/userInfo.model');
const addFriendRepo = require('../repository/addFriend.repo')
const {NotFoundError} = require("../core/response/error.response")
const {CREATED} = require("../core/response/success.response")

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
            throw new CREATED('already sent');
        }
        if (existingRequest && existingRequest.status === 'accepted') {
            throw new CREATED('You are already friends');
        }

        if (existingRequest && existingRequest.status === 'declined') {
            throw new CREATED('Friend request was declined');
        }
    
        const createdRequest = await addFriendRepo.createRequest(sourceID, targetID);
    
        return createdRequest;

    };
    
    static acceptFriendRequest = async (sourceID, targetID) => {
        if (!isMongoId(sourceID) || !isMongoId(targetID)) {
            throw new NotFoundError('invalid userID');
        }  
        const existingRequest = await addFriendRepo.findRequest(sourceID, targetID);   
        if (!existingRequest || existingRequest.status !== 'pending') {
            throw new NotFoundError('friend request not found or already processed');
        }

        const senderInfo = await userInfor.findOne({ user_id: sourceID });
        const receiverInfo = await userInfor.findOne({ user_id: targetID });

        if (!senderInfo.friendList.includes(targetID)) {
            senderInfo.friendList.push(targetID);
            await senderInfo.save();
        }
    
        if (!receiverInfo.friendList.includes(sourceID)) {
            receiverInfo.friendList.push(sourceID);
            await receiverInfo.save();
        }
        await addFriendRepo.updateRequestStatus(sourceID, targetID,"accepted")
        const updatedFriendRequest = await addFriendRepo.findRequest(sourceID, targetID);

        return updatedFriendRequest;
        // return 'friend request accepted';
    };
    
    
   
    static getAllFriendRequests = async (userID) => {
        if (!isMongoId(userID)) {
            throw new NotFoundError('invalid userID');
        }

        const requests = await addFriendRepo.findAllRequests(userID);

        return requests;
    };

  static declineFriendRequest = async (sourceID, targetID) => {
        if (!isMongoId(sourceID) || !isMongoId(targetID)) {
            throw new NotFoundError('invalid userID');
        }
        const existingRequest = await addFriendRepo.findRequest(sourceID, targetID);   
        if (!existingRequest || existingRequest.status !== 'pending') {
            throw new NotFoundError('friend request not found or already processed');
        }
        const deletedRequest = await addFriendRepo.deleteRequest(sourceID, targetID);

        return deletedRequest;
        await addFriendRepo.updateRequestStatus(sourceID, targetID, "declined");

        
    };

    static unFriend = async (sourceID, targetID) => {
        if (!isMongoId(sourceID) || !isMongoId(targetID)) {
            throw new NotFoundError('invalid userID');
        }
        const existingRequest = await addFriendRepo.findRequest(sourceID, targetID);

        if (!existingRequest || existingRequest.status === 'pending') {
            throw new NotFoundError('friend request not found or not a friend');
        }
        const senderInfo = await userInfor.findOne({ user_id: sourceID });
        const receiverInfo = await userInfor.findOne({ user_id: targetID });

        if (senderInfo.friendList.includes(targetID)) {
            senderInfo.friendList = senderInfo.friendList.filter(id => id !== targetID);
            await senderInfo.save();
        }

        if (receiverInfo.friendList.includes(sourceID)) {
            receiverInfo.friendList = receiverInfo.friendList.filter(id => id !== sourceID);
            await receiverInfo.save();
        }

        await addFriendRepo.updateRequestStatus(sourceID, targetID,"declined")

        const deletedRequest = await addFriendRepo.deleteRequest(sourceID, targetID);
      
        return deletedRequest;
    };

    static blockFriend = async (sourceID, targetID) => {
        if (!isMongoId(sourceID) || !isMongoId(targetID)) {
            throw new NotFoundError('invalid userID');
        }
        const existingRequest = await addFriendRepo.findRequest(sourceID, targetID);

        if (!existingRequest || existingRequest.status === 'pending') {
            throw new NotFoundError('friend request not found or not a friend');
        }
        const senderInfo = await userInfor.findOne({ user_id: sourceID });

        if (!senderInfo.blockList.includes(targetID)) {
            senderInfo.blockList.push(targetID);
            await senderInfo.save();
        }
        await addFriendRepo.updateRequestStatus(sourceID, targetID,"declined")

        const deletedRequest = await addFriendRepo.deleteRequest(sourceID, targetID);

        return deletedRequest;
    };
}


module.exports = addFriendService;

