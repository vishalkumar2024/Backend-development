import multer from "multer"

// Multer middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, './src/upload') // Destination, where the uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() + '-' + file.originalname) // Name of the uploaded file
    }
})

export const upload = multer({ storage: storage })