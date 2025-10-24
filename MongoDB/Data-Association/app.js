const express = require('express')
const app = express();

const userModel = require("./Model/user")
const postModel = require("./Model/post")


app.get('/', (req, res)=>{
    res.send("fine")
})

app.listen(3000)