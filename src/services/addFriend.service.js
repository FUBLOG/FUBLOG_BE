"use strict";

const User = require('../model/user.model');
const { isMongoId } = require('validator');
const userInfor = require('../model/userInfo.model');
const addFriendRepo = require('../repository/addFriend.repo')


class addFriendService {
    static sendFriendRequest = async (sourceID, targetID) => {
        if (!isMongoId(sourceID) || !isMongoId(targetID)) {
            throw new Error('invalid userID');
        }
    
        const sender = await User.findById(sourceID);
        const receiver = await User.findById(targetID);
    
        if (!sender || !receiver) {
            throw new Error('user not found');
        }
    
        const existingRequest = await addFriendRepo.findRequest(sourceID, targetID);
    
        if (existingRequest) {
            throw new Error('already sent');
        }
    
        const createdRequest = await addFriendRepo.createRequest(sourceID, targetID);
    
        return createdRequest;

    };
    
    static acceptFriendRequest = async (sourceID, targetID) => {
        if (!isMongoId(sourceID) || !isMongoId(targetID)) {
            throw new Error('invalid userID');
        }  
        const friendRequest = await addFriendRepo.findRequest(sourceID, targetID);   
        if (!friendRequest ) {
            throw new Error('friend request not found or already processed');
        }

        const senderInfo = await userInfor.findOne({ user_id: sourceID });
        const receiverInfo = await userInfor.findOne({ user_id: targetID });
        console.log(senderInfo)
        console.log(receiverInfo)
        if (!senderInfo.friendList.includes(targetID)) {
            senderInfo.friendList.push(targetID);
            await senderInfo.save();
        }
    
        if (!receiverInfo.friendList.includes(sourceID)) {
            receiverInfo.friendList.push(sourceID);
            await receiverInfo.save();
        }
        const updatedFriendRequest = await addFriendRepo.findRequest(sourceID, targetID);

        return updatedFriendRequest;
        // return 'friend request accepted';
    };
    
    
   
    static getAllFriendRequests = async (userID) => {
        if (!isMongoId(userID)) {
            throw new Error('invalid userID');
        }

        const requests = await addFriendRepo.findAllRequests(userID);

        return requests;
    };

    static declineFriendRequest = async (sourceID, targetID) => {
        if (!isMongoId(sourceID) || !isMongoId(targetID)) {
            throw new Error('invalid userID');
        }
    
        const deletedRequest = await addFriendRepo.deleteRequest(sourceID, targetID);
    
        return deletedRequest;
    };static declineFriendRequest = async (sourceID, targetID) => {
    if (!isMongoId(sourceID) || !isMongoId(targetID)) {
        throw new Error('invalid userID');
    }

    const deletedRequest = await addFriendRepo.deleteRequest(sourceID, targetID);

    return deletedRequest;
};

    
    
static declineFriendRequest = async (sourceID, targetID) => {
    if (!isMongoId(sourceID) || !isMongoId(targetID)) {
        throw new Error('invalid userID');
    }

    const deletedRequest = await addFriendRepo.deleteRequest(sourceID, targetID);

    return deletedRequest;
};


    static unFriend = async (sourceID, targetID) => {
        if (!isMongoId(sourceID) || !isMongoId(targetID)) {
            throw new Error('invalid userID');
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


        const deletedRequest = await addFriendRepo.deleteRequest(sourceID, targetID);
      
        return deletedRequest;
    };

    static blockFriend = async (sourceID, targetID) => {
        if (!isMongoId(sourceID) || !isMongoId(targetID)) {
            throw new Error('invalid userID');
        }

        const senderInfo = await userInfor.findOne({ user_id: sourceID });

        if (!senderInfo.blockList.includes(targetID)) {
            senderInfo.blockList.push(targetID);
            await senderInfo.save();
        }

        const deletedRequest = await addFriendRepo.deleteRequest(sourceID, targetID);

        return deletedRequest;
    };
}


module.exports = addFriendService;

