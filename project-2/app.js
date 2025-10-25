const express = require('express')
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require("./Model/user");
const postModel = require("./Model/post");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs")
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render("index")
})

app.post('/register', async (req, res) => {
    const { username, name, email, age, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) return res.status(500).send("User already exist with this email");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                username,
                name,
                email,
                age,
                password: hash,
            })
            
            let token = jwt.sign({ email: email, userId: createdUser._id }, "Secret");
            res.cookie("token", token);
            
            res.send(createdUser)

        })
    })


})

app.listen(3000)
