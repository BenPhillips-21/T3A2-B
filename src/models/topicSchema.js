import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// topic model
const topicSchema = new mongoose.Schema({
    topicName: {type: String, default: ''},
    topicID: {type: Number, default: 0},
    topicLevel: {type: Number, default: 1},
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video'}],
})

const topicModel = mongoose.model('Topic', topicSchema)

export default topicModel