const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Practice')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number,
})

module.export = mongoose.model("users", userSchema)