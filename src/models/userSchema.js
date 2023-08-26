import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 7777
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
})

const userModel = mongoose.model('User', userSchema)

export default userModel