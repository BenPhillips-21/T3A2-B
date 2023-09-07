import TopicModel from "../models/topicSchema.js";

// Function to insert multiple topics into the database
export async function insertTopics(req, res) {
    try {
        const topicsData = req.body; 
        await TopicModel.insertMany(topicsData); // Insert topics into the database
        res.json({ msg: "Topic data Saved Successfully...!" }); // Send a JSON response indicating successful data insertion
    } catch (error) {
        console.error(error);
        res.json({ error });
    }
}

// Function to retrieve all topics with populated questions and videos
export async function getTopics(req, res) {
    try {
        const topics = await TopicModel.find()
            .populate('questions') // Populate the 'questions' field with question data
            .populate('videos'); // Populate the 'videos' field with video data
        res.json(topics); // Send the populated topics as a JSON response
    } catch (error) {
        console.error(error);
        res.json({ error });
    }
}

// Function to retrieve a topic by its name with populated questions and videos
export async function getTopicByName(req, res) {
    const topicName = req.params.topicName;

    try {
        const topic = await TopicModel.findOne({ topicName })
            .populate('questions') // Populate the 'questions' field with question data
            .populate('videos'); // Populate the 'videos' field with video data

        // If the topic is not found, return a 404 error
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        // Send the populated topic as a JSON response
        res.json(topic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

// Function to delete all topics from the database
export async function deleteTopics(req, res) {
    try {
        await TopicModel.deleteMany(); // Delete all topics from the database
        res.json({ msg: "Topics deleted successfully" }); // Send a JSON response indicating successful deletion
    } catch (error) {
        res.json({ error });
    }
}

// Function to update a specific topic by its ID
export async function updateTopic(req, res) {
    const topicId = req.params.id; // Get the topic ID from the request parameters
    const updateData = req.body; // Get the updated topic data from the request body

    try {
        const updatedTopic = await TopicModel.findByIdAndUpdate(topicId, updateData, { new: true })
            .populate('questions') // Populate the 'questions' field with question data
            .populate('videos'); // Populate the 'videos' field with video data

        // If the topic is not found, return a 404 error
        if (!updatedTopic) {
            return res.status(404).json({ msg: "Topic not found" });
        }

        // Return a JSON response indicating successful topic update
        res.json({ msg: "Topic updated successfully", updatedTopic });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

// Function to retrieve a topic by its name and level with populated questions and videos
export async function getTopicByNameAndLevel(req, res) {
    const topicName = req.params.topicName;
    const topicLevel = req.params.topicLevel;

    try {
        const topic = await TopicModel.findOne({ topicName, topicLevel })
            .populate('questions') // Populate the 'questions' field with question data
            .populate('videos'); // Populate the 'videos' field with video data

        // If the topic is not found, return a 404 error
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        // Send the populated topic as a JSON response
        res.json(topic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}
