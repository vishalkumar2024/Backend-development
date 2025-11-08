import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js"
import { uploadOnCloudinary } from "../utils/fileUpload.js";


// Function to Register a user
const registerUser = async (req, res) => {

    // 1. Get user details from frontend ( here from postman).
    // 2. validation - check if any input field (specially email and userName) is empty or in wrong format.
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


// Function to login a user
const login = async (req, res) => {

    // 1. Get user details from frontend ( here from postman).
    // 2. validation - check if any input field (specially email and password) is empty or in wrong format.
    // 3. check if email or userName is correct or not.
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
            return res.error(400).send("Password is incorrect")
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
        throw new ApiError(500, "Cannot login the user ", error)
    }
}


// Function to log out a user
const logout = (req, res) => {
    try {
        const currentuser = req.user
        res.clearCookie("token")

        return res.status(200).json({
            success: true,
            message: currentuser.fullName + " is successfully logged out"
        })
    } catch (error) {
        throw new ApiError(500, "could not logout the user")
    }
}

const changeCurrentPassword = async (req, res) => {

    const { oldPassword, newPassword } = req.body

    const user = await UserModel.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json({
            success: true,
            status: 200,
            message: "Password changed successfully"
        })
}


const getCurrentUser = async (req, res) => {
    return res
        .status(200)
        .json({
            success: true,
            status: 200,
            data: req.user,
            message: "Password changed successfully"
        })
}

// Function to update user details 
const updateAccountDetails = async (req, res) => {
    const { fullName, email } = req.body

    if (!(fullName || email)) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await UserModel.findByIdAndUpdate(
        req.user?._id,
        {
            $set: { // by using $set, only those data will be updated which the user want to update
                fullName,
                email: email
            }
        },
        { new: true }

    ).select("-password")

    return res
        .status(200)
        .json({
            status: 200,
            data: user,
            message: "Account details updated successfully"
        })
}

// const updateUserAvatar = asyncHandler(async (req, res) => {
//     const avatarLocalPath = req.file?.path

//     if (!avatarLocalPath) {
//         throw new ApiError(400, "Avatar file is missing")
//     }

//     //TODO: delete old image - assignment

//     const avatar = await uploadOnCloudinary(avatarLocalPath)

//     if (!avatar.url) {
//         throw new ApiError(400, "Error while uploading on avatar")

//     }

//     const user = await User.findByIdAndUpdate(
//         req.user?._id,
//         {
//             $set: {
//                 avatar: avatar.url
//             }
//         },
//         { new: true }
//     ).select("-password")

//     return res
//         .status(200)
//         .json(
//             new ApiResponse(200, user, "Avatar image updated successfully")
//         )
// })



// Controller: Get a user's channel profile along with subscription statistics
const getUserChannelProfile = async (req, res) => {
    // Extract the username parameter from the request URL
    const { userName } = req.params;

    if (!userName?.trim()) {
        throw new ApiError(400, "username is missing");
    }

    // Aggregation pipeline on the UserModel
    const channel = await UserModel.aggregate([
        // 1️⃣ MATCH STAGE — find the user document that matches the given username
        {
            $match: {
                userName: userName.toLowerCase() // ensure case-insensitive comparison
            }
        },

        // 2️⃣ LOOKUP STAGE — find all subscriptions where this user is the channel
        {
            $lookup: {
                from: "subscriptions",   // foreign collection (Subscription model)
                localField: "_id",       // current user's _id
                foreignField: "channel", // match where this user's _id equals the subscription's 'channel'
                as: "subscribers"        // add matched documents as an array in 'subscribers'
            }
        },

        // 3️⃣ LOOKUP STAGE — find all subscriptions where this user is the subscriber
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",         // current user's _id
                foreignField: "subscriber",// match where this user's _id equals the subscription's 'subscriber'
                as: "subscribedTo"         // add matched documents as an array in 'subscribedTo'
            }
        },

        // 4️⃣ ADD FIELDS — calculate derived data for the profile
        {
            $addFields: {
                // Count how many users have subscribed to this channel
                subscribersCount: { $size: "$subscribers" },

                // Count how many channels this user has subscribed to
                channelsSubscribedToCount: { $size: "$subscribedTo" },

                // Determine if the currently logged-in user has subscribed to this channel
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                        // Check if req.user._id exists in 'subscribers.subscriber' array
                        then: true,
                        else: false
                    }
                }
            }
        },

        // 5️⃣ PROJECT STAGE — select which fields to include in the final output
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1
            }
        }
    ]);

    // Debug: log the aggregation result
    console.log("The channel is:", channel);

    // If no matching user (channel) found, throw a 404 error
    if (!channel?.length) {
        throw new ApiError(404, "Channel does not exist");
    }

    // Respond with the first matched document (channel[0])
    return res
        .status(200).
        json({
            data: channel[0],
            message: "User channel fetched successfully"
        });
};



export {
    registerUser,
    login,
    logout,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    getUserChannelProfile
} 