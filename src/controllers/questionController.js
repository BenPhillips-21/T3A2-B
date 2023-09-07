import Questions from "../models/questionSchema.js";

// Function to get questions based on a specific topic
export async function getQuestions(req, res) {
    try {
        const topic = req.params.topic; // Get topic from the req.params
        const query = topic ? { topic } : {}; // Create a query based on the provided topic (if available)
        const questions = await Questions.find(query); // Retrieve questions from the database based on the query
        res.json(questions); // Send the questions as a JSON response
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

// Function to update a specific question by its ID
export async function updateQuestion(req, res) {
    const questionId = req.params.id; // Get the question ID from the request parameters
    const updateData = req.body; // Get the updated question data from the request body

    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(questionId, updateData, { new: true });

        // If the question is not found, return a 404 error
        if (!updatedQuestion) {
            return res.status(404).json({ msg: "Question not found" });
        }

        // Return a JSON response indicating successful question update
        res.json({ msg: "Question updated successfully", updatedQuestion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

// Function to get questions by a specific topic
export async function getQuestionsByTopic(req, res) {
    try {
        const topic = req.params.topic; // Get the topic from the request parameters
        const query = topic ? { topic } : {}; // Create a query based on the provided topic (if available)
        const questions = await Questions.find(query); // Retrieve questions from the database based on the query
        res.json(questions); // Send the questions as a JSON response
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

// Function to get questions by a specific topic and level
export async function getQuestionsByTopicAndLevel(req, res) {
    try {
        const { topic, level } = req.params; // Get the topic and level from the request parameters
        const query = {};

        if (topic) {
            query.topic = topic;
        }

        if (level) {
            query.level = parseInt(level);
        }

        const questions = await Questions.find(query); // Retrieve questions from the database based on the query
        res.json(questions); // Send the questions as a JSON response
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

// Function to insert new questions into the database
export async function insertQuestions(req, res) {
    try {
        const questionData = req.body;

        if (!questionData || !questionData.topic || !questionData.level || !questionData.question || !questionData.options || !questionData.answer) {
            return res.status(400).json({ error: "Invalid request body. Make sure all required fields are provided." });
        }

        await Questions.create(questionData); // Create a new question in the database
        res.json({ msg: "Data Saved Successfully...!" }); // Send a JSON response indicating successful data insertion
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while saving data." });
    }
}

// Function to delete all questions from the database
export async function deleteQuestions(req, res) {
    try {
        await Questions.deleteMany(); // Delete all questions from the database
        res.json({ msg: "Questions deleted successfully" }); // Send a JSON response indicating successful deletion
    } catch (error) {
        res.json({ error });
    }
}
