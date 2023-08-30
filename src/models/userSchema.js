import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true
    },
    userStats: {
        codingLevel: {
            type: Number,
            required: true,
            default: 1
        },
        geographyLevel: {
            type: Number,
            required: true,
            default: 1
        },
        napoleonLevel: {
            type: Number,
            required: true,
            default: 1
        } 
    },
    roles: {
        User: {
            type: Number,
            default: 7777
        },
        Admin: {
            type: Number,
            default: 2121
        }
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
})

const userModel = mongoose.model('User', userSchema)

export default userModel