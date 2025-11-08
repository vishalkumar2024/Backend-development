import mongoose from 'mongoose'

const subscriptionSchema = mongoose.Schema({
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
}, { timeStamps: true })

export const Subscription = mongoose.model("Subscription", subscriptionSchema)
