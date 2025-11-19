import { Schema } from "mongoose"


const likeSchema = Schema({
    likedBy: {
        user: Schema.Types.ObjectId,
        ref: "User",
    },
    comment: {
        user: Schema.Types.ObjectId,
        ref: "Comment",
    },
    video: {
        user: Schema.Types.ObjectId,
        ref: "Video",
    },
    tweet: {
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    }
}, { timestamps: true })

export const LikeModel = mongoose.model("Likes", likeSchema)