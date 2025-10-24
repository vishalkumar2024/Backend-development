const express = require('express');
const app = express();
const path = require('path')

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

app.post('/create', async function (req, res) {
    const newUser = await userModel.create({
        username: "String",
        email: "String",
        password: "String",
        age: "Number",
    })

    res.send(newUser)

})

app.listen(3000);  