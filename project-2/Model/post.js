const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pactice-2')

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: String,
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    ]

})

module.exports = mongoose.model("posts", postSchema);