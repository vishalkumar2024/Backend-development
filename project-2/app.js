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

app.get('/login', (req, res) => {
    res.render("login")
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) return res.status(500).send("No user found");

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            
            let token = jwt.sign({ email: email, userId: user._id }, "Secret");
            res.cookie("token", token);

            res.status(200).send("You can login");
        }
        else res.redirect("/login")
    })
})

app.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect("/login")
})

app.get('/profile', isLoggedIn, (req, res) => { // '.profile' is a protected route by a middleware i.e isLoggedIn
    res.send("you are in profile")
})



function isLoggedIn(req, res, next) {  //This is a middleware
    if (req.cookies.token === "") return res.send("You need to LogIn")
    else {
        let data = jwt.verify(req.cookies.token, "Secret",)
        req.user = data
        console.log(req.user)
        next();
    }
}

app.listen(3000)
