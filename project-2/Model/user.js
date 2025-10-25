const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pactice-2')

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    age: Number,
    password: String,
    post:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"posts"
        }
    ]

})

module.exports = mongoose.model("users", userSchema);