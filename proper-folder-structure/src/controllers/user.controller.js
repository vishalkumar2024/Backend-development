import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js"
import { uploadOnCloudinary } from "../utils/fileUpload.js";


const registerUser = async (req, res) => {

    // 1. Get user details from frontend ( here from postman).
    // 2. validation - check if any input field (specially email and username) is empty or in wrong format.
    // 3. Check if user already exist.
    // // 4. Check if user give his avatar image or not
    // // 5. If user gave his avatar image then send it to cloudinary ( to store image files)
    // 6. Creating user by userModel.create (CRUD) to store in database.
    // 7. Remove password and refresh token field from response. 
    // 8. Check for user creation- if true then return res.


    const { email, fullName, userName, password } = req.body; // 1.

    try {
        if (fullName == "" || email == "" || userName === "" || password == "") { // 2.
            throw new ApiError(404, "All input fields are not filled")
        }

        const existedUser = await UserModel.findOne({ // 3.
            $or: [{ email }, { userName }]
        })
        if (existedUser) {
            throw new ApiError(400, "User already exist with this email or userName ")
        }

        // Skipping file upload as of now

        // const avatarlocalPath = req.files?.avatar[0]?.path; // .4
        // const coverImagelocalPath = req.files?.coverImage[0]?.path;


        // if (!avatarlocalPath) {
        //     throw new ApiError(400, "Avatar is required firstly")
        // }

        // const avatar = await uploadOnCloudinary(avatarlocalPath)  // 5.
        // const coverImage = await uploadOnCloudinary(coverImagelocalPath)

        // if (!avatar) {
        //     throw new ApiError(400, "Avatar is required secondly")
        // }



        const user = await UserModel.create({ //.6
            email,
            password,
            fullName,
            // avatar: avatar.url,
            // coverImage: coverImage?.url || "",
            userName: userName.toLowerCase(),

        })

        const createdUser = await UserModel.findOne(user._id).select( //.7
            "-password -refreshToken"
        )

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering user")
        }

        return res.status(200).json(createdUser) //.8
    } catch (error) {
        throw new ApiError(500, "Cannot register the user")
    }

}

const login = async (req, res) => {

    // 1. Get user details from frontend ( here from postman).
    // 2. validation - check if any input field (specially email and password) is empty or in wrong format.
    // 3. check if email or username is correct or not.
    // 4. if email is correct, then check the password.
    // 5. assign a jwt token, send it to the client's browser
    // 6. set cookie
    // 7. return th data


    const { email, password } = req.body;

    try {

        if (!email || !password) { 
            throw new ApiError(404, "All input fields are not filled")
        }

        const existedUser = await UserModel.findOne({ email: email })

        if (!existedUser) {
            throw new ApiError(404, 'User does not exist with this email')
        }

        const isPasswordMatch = await existedUser.isPasswordCorrect(password)

        if (!isPasswordMatch) {
            throw new ApiError(404, 'Password is incorrect')
        }

        const token = jwt.sign(
            { userId: existedUser._id, email: existedUser.email },
            process.env.SECRET,
            { expiresIn: "1d" }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.SECRET === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        const userResponse = { ...existedUser.toObject() }
        delete userResponse.password

        return res.status(200).json({
            success: true,
            message: "Successfully login",
            user: userResponse
        })

    } catch (error) {
        throw new ApiError(500, "cannot login")
    }
}

export { registerUser, login } 