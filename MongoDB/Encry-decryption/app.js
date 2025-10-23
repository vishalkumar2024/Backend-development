const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(cookieParser());

app.get('/', function (req, res) {
    res.cookie("name", "thisIsCookie"); //set a cookie
    res.send("Hello MongoDB");
})

// Cookie- A cookie  is a small piece of data stored in the browser and sent automatically with every HTTP request to the same domain.
app.get('/setcookie', function (req, res) {
    console.log(req.cookies);
    res.send('This is setCookie page')
})

// Encryption = Locking our message with a key
// Decryption = Unlocking it with the same (or matching) key

// Bcrypt is a npm package
// Bcrypt default code
// hash a password
app.get('/encrypt', function (req, res) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash("myPlaintextPassword", salt, function (err, hash) {
            console.log(hash)
            res.send("Bcrypt is working fine")
        });
    });
})


// To check password
app.get('/decrypt', function (req, res) {
    // Load hash from your password DB.
    bcrypt.compare("myPlaintextPassword", "$2b$10$./W6b4nBobE42N068WiSg.XQkIVMKwSD1sry9WM66cB2O7sOcOdkG", function (err, result) {
        console.log(result);
        res.send("This is Decrypt");
    });
})




app.listen('3000');
