import TopicModel from "../models/topicSchema.js";

export async function insertTopics(req, res) {
    try {
        const topicsData = req.body; // Assuming you're sending raw JSON in the request body
        await TopicModel.insertMany(topicsData);
        res.json({ msg: "Topic data Saved Successfully...!" });
    } catch (error) {
        console.error(error);
        res.json({ error });
    }
}

export async function getTopics(req, res) {
    try {
        const topics = await TopicModel.find()
            .populate('questions')
            .populate('videos')
        res.json(topics)
    } catch (error) {
        console.error(error)
        res.json({ error })
    }
}

export async function getTopicByName(req, res) {
    const topicName = req.params.topicName

    try {
        const topic = await TopicModel.findOne({ topicName })
            .populate('questions')
            .populate('videos');

        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        res.json(topic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

export async function deleteTopics(req, res) {
    try {
        await TopicModel.deleteMany()
        res.json({msg: "Topics deleted successfully"})
    } catch (error) {
        res.json({error})
    }
}

export async function updateTopic(req, res) {
    const topicId = req.params.id
    const updateData = req.body

    try {
        const updatedTopic = await TopicModel.findByIdAndUpdate(topicId, updateData, { new: true })
            .populate('questions')
            .populate('videos')

        if (!updatedTopic) {
            return res.status(404).json({ msg: "Topic not found" })
        }

        res.json({ msg: "Topic updated successfully", updatedTopic })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error })
    }
}

