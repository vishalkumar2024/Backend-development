import { Router } from 'express';
import { login, registerUser } from '../controllers/user.controller.js';
const router = Router();
import { upload } from "../middlewares/multer.js"


router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)

router.route('/login').post(login)



export default router
