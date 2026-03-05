import express from 'express'
const route = express.Router()
import {upload} from '../middlewares/multer.js'
import {uploadOnCloudinary} from '../Utils/Cloudinary.js'


route.post(
    '/upload',
    upload.single('image'),
    uploadOnCloudinary
)

export default route