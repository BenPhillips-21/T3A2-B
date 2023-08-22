import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// question model
const questionSchema = new mongoose.Schema({
    questions: { type: Array, default: [] },
    answers: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now }
}) 

const questionModel = mongoose.model('Question', questionSchema)

export default questionModel