const express = require('express');
const app = express();

const userModel = require("./usermodel");


app.get("/", function (req, res) {
    res.send("Hii this is backend");
})

// Create users

app.get("/create", async function (req, res) {
    const createdUser = await userModel.create({
        name: "Vishal",
        username: "vishal@kumar",
        email: "vishal@gmail.com"
    })
    res.send(createdUser)
})
app.get("/create", async function (req, res) {
    const createdUser = await userModel.create({
        name: "kaushik",
        username: "kaushik@singh",
        email: "kaushik@gmail.com"
    })
    res.send(createdUser)
})


// Read user
app.get("/read", async function (req, res) {
    const readTheUser = await userModel.find(); //find() gives an array, even if there is no any user it gives a blank array, but if we use findOne() it gives an object, if there is no any user it gives null, it gives first element
    // const readTheUser = await userModel.findOne({name:"Aurobindo"});

    res.send(readTheUser)
})


// Update user
// app.get("/update", async function (req, res) {
//   const updatedUser = await userModel.findOneAndUpdate({name:"Vishal"},{email:"Vishalkumar2025@gmail.com"},{new:true})

//    res.send(updatedUser)
// })


// Delete user
app.get("/delete", async function (req, res) {
    const deletedUser = await userModel.findOneAndDelete({ name: "Vishal" });

    res.send(deletedUser)
})

app.listen(3000);