const addFriendService = require("../services/addFriend.service")
const { OK } = require('../core/response/success.response');
const user = require("../services/user.service")

const sendFriendRequest = async (req, res,next) => {
    const { targetID } = req.body;
    const sourceID= req.user.userId;
    const response = new OK({
        message: "sent request",
        metadata: await addFriendService.sendFriendRequest(targetID,sourceID)
    });
    response.send(res);
};

const acceptFriendRequest= async (req, res,next) => {
    const { targetID } = req.body;
    const sourceID = req.user.userId;
    const response = new OK({
        message: "accepted request",
        metadata: await addFriendService.acceptFriendRequest(targetID,sourceID)
    });
    response.send(res);
};
const declineFriendRequest = async (req, res,next) => {
    const { targetID } = req.body;
    const sourceID = req.user.userId;
    const response = new OK({
        message: "declined request",
        metadata: await addFriendService.declineFriendRequest(targetID,sourceID)
    });
    response.send(res);
};
const getAllFriendRequests = async (req, res,next) => {
    const { targetID } = req.body;
    const sourceID = req.user.userId;
    const response = new OK({
        message: "listed all sent request",
        metadata: await addFriendService.getAllFriendRequests(targetID,sourceID)
    });
    response.send(res);
};
const unFriend = async (req, res,next) => {
    const { targetID } = req.body;
    const sourceID= req.user.userId;
    const response = new OK({
        message: "unfriended successfully",
        metadata: await addFriendService.unFriend(targetID,sourceID)
    });
    response.send(res);
};

const block = async (req, res,next) => {
    const { targetID } = req.body;
    const sourceID= req.user.userId;
    const response = new OK({
        message: "blocked successfully",
        metadata: await addFriendService.blockFriend(targetID,sourceID)
    });
    response.send(res);
};


module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    getAllFriendRequests,
    unFriend,
    block
}
