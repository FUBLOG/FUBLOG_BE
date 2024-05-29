const User = require('../model/user.model');
const { isMongoId } = require('validator');

const sendFriendRequest = async (senderId, receiverId) => {
    if (!isMongoId(senderId) || !isMongoId(receiverId)) {
        throw new Error('invalid userID');
    }

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
        throw new Error('user not found');
    }

    if (!sender.sendFriendRequest.includes(receiverId)) {
        sender.friendRequestsSent.push(receiverId);
        receiver.friendRequestsReceived.push(senderId);

        await sender.save();
        await receiver.save();

        return 'sent request';
    } else {
        throw new Error('already sent');
    }
};

const acceptFriendRequest = async (receiverId, senderId) => {
    if (!isMongoId(receiverId) || !isMongoId(senderId)) {
        throw new Error('invalid userID');
    }

    const receiver = await User.findById(receiverId);
    const sender = await User.findById(senderId);

    if (!receiver || !sender) {
        throw new Error('user not found');
    }

    if (receiver.friendRequestsReceived.includes(senderId)) {
        receiver.friends.push(senderId);
        sender.friends.push(receiverId);

        receiver.friendRequestsReceived = receiver.friendRequestsReceived.filter(id => id.toString() !== senderId);
        sender.friendRequestsSent = sender.friendRequestsSent.filter(id => id.toString() !== receiverId);

        await receiver.save();
        await sender.save();

        return 'accepted request';
    } else {
        throw new Error('not found request');
    }
};

const declineFriendRequest = async (receiverId, senderId) => {
    if (!isMongoId(receiverId) || !isMongoId(senderId)) {
        throw new Error('invalid userID');
    }

    const receiver = await User.findById(receiverId);
    const sender = await User.findById(senderId);

    if (!receiver || !sender) {
        throw new Error('user not found');
    }

    if (receiver.friendRequestsReceived.includes(senderId)) {
        receiver.friendRequestsReceived = receiver.friendRequestsReceived.filter(id => id.toString() !== senderId);
        sender.friendRequestsSent = sender.friendRequestsSent.filter(id => id.toString() !== receiverId);

        await receiver.save();
        await sender.save();

        return 'declined request';
    } else {
        throw new Error('not found request');
    }
};

const getAllFriendRequests = async (receiverId) => {
    if (!isMongoId(receiverId)) {
        throw new Error('invalid userID');
    }

    const user = await User.findById(receiverId);

    if (!user) {
        throw new Error('user not found');
    }

    const friendRequests = await User.find({ _id: { $in: user.friendRequestsReceived } });

    return friendRequests;
};

module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    getAllFriendRequests
};
