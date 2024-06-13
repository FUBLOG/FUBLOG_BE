"use strick"
const addFriend = require("../model/addFriend.model")

class addFriendRepo {
    async findRequest(sourceID, targetID) {
        return await addFriend.findOne({ sourceID, targetID });
    }

    async createRequest(sourceID, targetID) {
        const friendRequest = new addFriend({
            sourceID,
            targetID,
           status: 'pending'  
        });

        return await friendRequest.save();
    }

    async updateRequestStatus(sourceID, targetID, status) {
        return await addFriend.findOneAndUpdate(
            { sourceID, targetID },
            { status },
            { new: true }
        );
    }
    async deleteRequest(sourceID, targetID) {
        return await addFriend.findOneAndDelete({ sourceID, targetID });
    }
    

    async findAllRequests(userID) {
        return await addFriend.find({
            $or: [{ sourceID: userID }, { targetID: userID }]
        }).populate('sourceID targetID', 'name email');
    }
}

module.exports = new addFriendRepo();
