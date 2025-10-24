const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/dataAssociation')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts'
        }
    ],
})

module.exports = mongoose.model("users", userSchema)