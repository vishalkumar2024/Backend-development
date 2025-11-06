import jwt from "jsonwebtoken"
import { ApiError } from "../utils/apiError.js"
import { UserModel } from "../models/user.model.js"


export const isAuth = async (req, res, next) => {
    try {

        const { token } = req.cookies

        if (!token) {
            return res.status(401).json({
                success:false,
                message:"No any user logged in"
            })
        }

        const decodedToken = jwt.verify(token, process.env.SECRET)

        const user = await UserModel.findById(decodedToken?.userId).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(500, "User cannot be found")
    }
} 