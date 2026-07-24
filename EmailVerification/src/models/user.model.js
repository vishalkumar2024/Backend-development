import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verficationCode: {
        type: String
    }
},
    {
        timestamps: true
    }
)

const userModel = mongoose.model('user', userSchema)

export default userModel