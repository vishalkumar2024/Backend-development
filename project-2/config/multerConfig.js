const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

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
module.exports = upload