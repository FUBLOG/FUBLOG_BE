const User = require('../models/User');
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

const acceptFriendRequest = async (userId, friendId) => {
    if (!isMongoId(userId) || !isMongoId(friendId)) {
        throw new Error('invalid userID');
    }

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
        throw new Error('user not found');
    }

    if (user.friendRequestsReceived.includes(friendId)) {
        user.friends.push(friendId);
        friend.friends.push(userId);

        user.friendRequestsReceived = user.friendRequestsReceived.filter(id => id.toString() !== friendId);
        friend.friendRequestsSent = friend.friendRequestsSent.filter(id => id.toString() !== userId);

        await user.save();
        await friend.save();

        return 'accepted request';
    } else {
        throw new Error('not found request');
    }
};

const declineFriendRequest = async (userId, senderId) => {
    if (!isMongoId(userId) || !isMongoId(senderId)) {
        throw new Error('invalid userID');
    }

    const user = await User.findById(userId);
    const sender = await User.findById(senderId);

    if (!user || !sender) {
        throw new Error('user not found');
    }

    if (user.friendRequestsReceived.includes(senderId)) {
        user.friendRequestsReceived = user.friendRequestsReceived.filter(id => id.toString() !== senderId);
        sender.friendRequestsSent = sender.friendRequestsSent.filter(id => id.toString() !== userId);

        await user.save();
        await sender.save();

        return 'declined request';
    } else {
        throw new Error('not found request');
    }
};

const getAllFriendRequests = async (userId) => {
    if (!isMongoId(userId)) {
        throw new Error('invalid userID');
    }

    const user = await User.findById(userId);

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
