import { Router } from 'express';
import { login, registerUser, logout, changeCurrentPassword, getCurrentUser, updateAccountDetails, getUserChannelProfile } from '../controllers/user.controller.js';
const router = Router();
import { upload } from "../middlewares/multer.js"
import { isAuth } from '../middlewares/isAuth.middleware.js';



router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route('/login').post(login)
router.post('/logout', isAuth, logout)
router.post('/changePassword', isAuth, changeCurrentPassword)
router.post('/getCurrentUser', isAuth, getCurrentUser)
router.post('/updateAccountDetails', isAuth, updateAccountDetails)
router.post('/getUserChannelProfile/:userName', isAuth, getUserChannelProfile)




export default router
