const User = require('../model/user.model');
const { isMongoId } = require('validator');
const userInfor = require ("../services/userInfo.service")

const sendFriendRequest = async (sourceID, tagetID) => {
    if (!isMongoId(sourceID) || !isMongoId(tagetID)) {
        throw new Error('invalid userID');
    }

    const sender = await User.findById(sourceID);
    const receiver = await User.findById(tagetID);

    if (!sender || !receiver) {
        throw new Error('user not found');
    }

    if (!sender.sendFriendRequest.includes(tagetID)) {
        sender.friendRequestsSent.push(tagetID);
        receiver.friendRequestsReceived.push(sourceID);

        await sender.save();
        await receiver.save();

        return 'sent request';
    } else {
        throw new Error('already sent');
    }
};

const acceptFriendRequest = async (tagetID, sourceID) => {
    if (!isMongoId(tagetID) || !isMongoId(sourceID)) {
        throw new Error('invalid userID');
    }

    const receiver = await User.findById(tagetID);
    const sender = await User.findById(sourceID);

    if (!receiver || !sender) {
        throw new Error('user not found');
    }

    if (receiver.friendRequestsReceived.includes(sourceID)) {

        const receiverInfo = await userInfor.getInfoUser(tagetID);
        const senderInfo = await userInfor.getInfoUser(sourceID);

        if (!receiverInfo || !senderInfo) {
            throw new Error('user info not found');
        }

        receiverInfo.friends.push(sourceID);
        senderInfo.friends.push(tagetID);


        await receiverInfo.save();
        await senderInfo.save();

        receiver.friendRequestsReceived = receiver.friendRequestsReceived.filter(id => id.toString() !== sourceID);
        sender.friendRequestsSent = sender.friendRequestsSent.filter(id => id.toString() !== tagetID);

        await receiver.save();
        await sender.save();

        return 'accepted request';
    } else {
        throw new Error('not found request');
    }
};

const declineFriendRequest = async (tagetID, sourceID) => {
   if (!isMongoId(tagetID) || !isMongoId(sourceID)) {
       throw new Error('invalid userID');
   }

   const receiver = await User.findById(tagetID);
   const sender = await User.findById(sourceID);

   if (!receiver || !sender) {
       throw new Error('user not found');
   }

   if (receiver.friendRequestsReceived.includes(sourceID)) {
       receiver.friendRequestsReceived = receiver.friendRequestsReceived.filter(id => id.toString() !== sourceID);
       sender.friendRequestsSent = sender.friendRequestsSent.filter(id => id.toString() !== tagetID);

       await receiver.save();
       await sender.save();

       return 'declined request';
   } else {
       throw new Error('not found request');
   }
};

const getAllFriendRequests = async (tagetID) => {
   if (!isMongoId(tagetID)) {
       throw new Error('invalid userID');
   }

   const user = await User.findById(tagetID);

   if (!user) {
       throw new Error('user not found');
   }

   const friendRequests = await User.find({ _id: { $in: user.friendRequestsReceived } });

   return friendRequests;
};

const unFriend = async (sourceID, targetID) => {
    if (!isMongoId(sourceID) || !isMongoId(targetID)) {
        throw new Error('invalid userID');
    }

    const sender = await User.findById(sourceID);
    const receiver = await User.findById(targetID);

    if (!sender || !receiver) {
        throw new Error('user not found');
    }


    const senderInfo = await userInfor.getInfoUser(sourceID);
    const receiverInfo = await userInfor.getInfoUser(targetID);

    if (!senderInfo || !receiverInfo) {
        throw new Error('user info not found');
    }

    if (!senderInfo.friends.includes(targetID)) {
        throw new Error('not friends');
    }

    senderInfo.friends = senderInfo.friends.filter(id => id.toString() !== targetID);
    receiverInfo.friends = receiverInfo.friends.filter(id => id.toString() !== sourceID);

    await sourceUserInfo.save();
    await targetUserInfo.save();

    return 'unfriended successfully';
};


module.exports = {
   sendFriendRequest,
   acceptFriendRequest,
   declineFriendRequest,
   unFriend,
   getAllFriendRequests
};

