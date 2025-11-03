import { User } from "../models/user.model.js";
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

    if (fullName == "" || email == "" || userName === "" || password == "") { // 2.
        throw new ApiError(404, "All input fields are not filled")
    }

    const existedUser = await User.findOne({ // 3.
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


  
    const user = await User.create({ //.6
        email,
        password,
        fullName,
        // avatar: avatar.url,
        // coverImage: coverImage?.url || "",
        userName: userName.toLowerCase(),

    })

    const createdUser = await User.findOne(user._id).select( //.7
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res.status(200).json(createdUser) //.8
 
}

export { registerUser } 