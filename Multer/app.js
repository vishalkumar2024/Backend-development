const express = require('express')
const app = express();

const path = require('path');
const multer = require('multer')
const crypto = require('crypto')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs")

// Multer - DiskStorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploadImages')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(14, (err, bytes) => { // crypto is a node package used to set  random texts
            const fn = bytes.toString('hex') + path.extname(file.originalname)
            cb(null, fn)
        })
    }
})
const upload = multer({ storage: storage })

app.get('/', (req, res) => { 
    res.render("index");
})

app.post('/uploadFile', upload.single('newFile'), (req, res) => { // post- uploadFile to handle upload files

    console.log(req.file)
    res.redirect('/')

})

app.listen(3000, (err) => {
    if (err) console.log(err)
})
