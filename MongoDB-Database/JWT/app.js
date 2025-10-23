const express = require('express');
const app = express();
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

app.use(cookieParser())

app.get('/', function (req, res) {

    var token = jwt.sign({ email: 'node@gmail.com' }, 'Secret');  //This 'Secret' string is very sensitive, usually it is not a plain text
    res.cookie("token", token)
    console.log(token)
    res.send("Backend is running");
})

app.get('/read', function (req, res) {
    let data = jwt.verify(req.cookies.token, "Secret")
    console.log(data)
})

app.listen(3000)
