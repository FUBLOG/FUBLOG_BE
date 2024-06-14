"use strict";

const User = require('../model/user.model');
const { isMongoId } = require('validator');
const userInfor = require('../model/userInfo.model');
const addFriendRepo = require('../repository/addFriend.repo')
const {NotFoundError} = require("../core/response/error.response")
const {CREATED} = require("../core/response/success.response")
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
        // const existingRequest = await addFriendRepo.findRequest(sourceID, targetID);   
        // if (!existingRequest || existingRequest.status !== 'pending') {
        //     throw new NotFoundError('friend request not found or already processed');
        // }
    
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
    
        return {
            friend_id: targetID,
            displayName: receiver.displayName,
            avatar: receiverInfo.avatar,
            profileHash: receiver.profileHash
        };
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

    // static blockFriend = async (sourceID, targetID) => {
    //     if (!isMongoId(sourceID) || !isMongoId(targetID)) {
    //         throw new NotFoundError('invalid userID');
    //     }
    //     const existingRequest = await addFriendRepo.findRequest(sourceID, targetID);

    //     if (!existingRequest || existingRequest.status === 'pending') {
    //         throw new NotFoundError('friend request not found or not a friend');
    //     }
    //     const senderInfo = await userInfor.findOne({ user_id: sourceID });

    //     if (!senderInfo.blockList.includes(targetID)) {
    //         senderInfo.blockList.push(targetID);
    //         await senderInfo.save();
    //     }
    //     await addFriendRepo.updateRequestStatus(sourceID, targetID,"declined")

    //     const deletedRequest = await addFriendRepo.deleteRequest(sourceID, targetID);

    //     return deletedRequest;
    // };
    static blockFriend = async (sourceID, targetID) => {
        console.log(sourceID);
    if (!isMongoId(sourceID) || !isMongoId(targetID)) {
        throw new NotFoundError('invalid userID');
    }

    const existingRequest = await addFriendRepo.findRequest(sourceID, targetID);
    // if (!existingRequest || existingRequest.status === 'pending') {
    //     throw new NotFoundError('friend request not found or not a friend');
    // }

    const senderInfo = await userInfor.findOne({ user_id: sourceID });
    const receiverInfo = await userInfor.findOne({ user_id: targetID });

    const sender = await users.findOne({ _id: sourceID })
    console.log(sender);
    if (!receiverInfo.blockList.find(friend => friend.friend_id.equals(sourceID))) {
        receiverInfo.blockList.push({
            friend_id: sourceID,
            displayName: sender.displayName,
            avatar: senderInfo.avatar,
            profileHash: sender.profileHash
        });
        await receiverInfo.save();
    }

    await addFriendRepo.updateRequestStatus(sourceID, targetID, "declined");
    await addFriendRepo.deleteRequest(sourceID, targetID);

    return {
        friend_id: sourceID,
        displayName: sender.displayName,
        avatar: senderInfo.avatar,
        profileHash: sender.profileHash
    };
};

}


module.exports = addFriendService;
