import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// question model
const questionSchema = new mongoose.Schema({
    topic: {type: String, default: ''},
    level: {type: Number, default: 1},
    question: { type: String, default: '' },
    options: { type: Array, default: [] },
    answer: { type: String, default: ''},
    createdAt: { type: Date, default: Date.now }
}) 

const questionModel = mongoose.model('Question', questionSchema)

export default questionModel