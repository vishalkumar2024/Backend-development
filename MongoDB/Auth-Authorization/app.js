const express = require('express');
const app = express();

const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const userModel = require('./Model/User');
const cookieParser = require('cookie-parser');

app.set('view engine', "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'pulic')))
app.use(cookieParser())


app.get('/', function (req, res) {
    res.render('index');
})

app.post('/create', (req, res) => {
    let { username, email, password, age } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let newUser = await userModel.create({
                username,
                email,
                password: hash,
                age,
            })

            let token = jwt.sign({ email }, 'secret');
            res.cookie("token", token)

            res.send(newUser)
        });
    });

})

app.get('/login', (req, res) => {
    res.render("login")
})


app.post('/login', async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.send("Email is wrong"); //checking if email is correct 

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: req.body.email }, 'secret');
            res.cookie("token", token)

            return res.send("You can login")  //checking if password is correct
        } else {
            res.send("password is incorrect")
        }
    })
})


app.get('/logout', (req, res) => {
    res.cookie("token", "")
    res.redirect("/")
})

app.listen(3000);  