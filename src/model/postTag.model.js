const { default: mongoose } = require("mongoose");


const postTag = mongoose.Schema({
    postTagContent: {
        type: String,
        required: true
    }
    
},{timestamps: true })

module.exports = mongoose.model("PostTag", postTag)
