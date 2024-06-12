const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestFriendSchema = new Schema({
    sourceID: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
    targetID: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
    status: {
        type: String,
        enum : ['pending','accepted','declined',],
        default: 'pending',
    }
}, { timestamps: true });

module.exports = mongoose.model('RequestFriend', requestFriendSchema);
