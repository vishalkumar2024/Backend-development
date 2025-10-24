const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    postData: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("posts", postSchema)
