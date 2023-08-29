import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// video model
const videoSchema = new mongoose.Schema({
    topic: {type: String, default: ''},
    level: {type: Number, default: 1},
    link: {type: String, default: ''},
    videoTitle: {type: String, default: ''},
}) 

const videoModel = mongoose.model('Video', videoSchema)

export default videoModel