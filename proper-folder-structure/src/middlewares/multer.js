
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/TempFiles')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalName)
    }
})

export const upload = multer({ storage: storage })