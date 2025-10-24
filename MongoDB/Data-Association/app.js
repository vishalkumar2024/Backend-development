const express = require('express')
const app = express();

const userModel = require("./Model/user")
const postModel = require("./Model/post")


app.get('/', (req, res) => {
    res.send("fine")
})

app.get('/create', async (req, res) => {
    const user = await userModel.create({
        username: "Rahul",
        email: "rahul@gmail.com",
        age: 23,

    })
    res.send(user)
})


app.get('/post/create', async (req, res) => {
    const post = await postModel.create({
        postData: "post 1",
        user: "68fb9af8bd16efcf611769f4",
    })

    let user = await userModel.findOne({ _id: "68fb9af8bd16efcf611769f4" });
    await user.post.push(post._id)
    await user.save()
    
    res.send({post,user })
})

app.listen(3000)