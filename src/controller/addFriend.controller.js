const addFriendService = require('../services/addFriends.service');
const { OK } = require('../core/response/success.response');

const sendFriendRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;
    const response = new OK({
        message: "sent request",
        metadata: await addFriendService.sendFriendRequest(senderId, receiverId)
    });
    response.send(res);
};

const acceptFriendRequest= async (req, res) => {
    const { userId, friendId } = req.body;
    const response = new OK({
        message: "accepted request",
        metadata: await addFriendService.acceptFriendRequest(userId, friendId)
    });
    response.send(res);
};

const declineFriendRequest = async (req, res) => {
    const { userId, senderId } = req.body;
    const response = new OK({
        message: "declined request",
        metadata: addFriendService.declineFriendRequest(userId, senderId)
    });
    response.send(res);
};

const getAllFriendRequests = async (req, res) => {
    const { userId } = req.body;
    const response = new OK({
        message: "listed all sent request",
        metadata: await addFriendService.getAllFriendRequests(userId)
    });
    response.send(res);
};

module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    getAllFriendRequests
};
