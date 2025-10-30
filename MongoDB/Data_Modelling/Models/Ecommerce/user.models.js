import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: string,
            required: true,
        },
    },
    { timestamps: true } // timestamps stores data = createdAt(), updatedAt()
);

export const User = mongoose.model('User', userSchema);
