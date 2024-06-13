const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
   profileHash: {
   type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
   },
   displayName: {
   type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
   },
   avatar: {
   type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInfo',
    required: true,
   }
})

module.exports = mongoose.model('searhUser', searchSchema);
