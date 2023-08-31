import Questions from "../models/questionSchema.js";

export async function getQuestions(req, res) {
    try {
        const topic = req.params.topic; 
        const query = topic ? { topic } : {}; 
        const q = await Questions.find(query);
        res.json(q);
    } catch (error) {
        console.log(error)
        res.json({ error });
    }
}

export async function updateQuestion(req, res) {
    const questionId = req.params.id
    const updateData = req.body

    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(questionId, updateData, { new: true })

        if (!updatedQuestion) {
            return res.status(404).json({ msg: "Question not found" })
        }

        res.json({ msg: "Question updated successfully", updatedQuestion })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error })
    }
}

export async function getQuestionsByTopic(req, res) {
    try {
        const topic = req.params.topic;
        const query = topic ? { topic } : {};
        const q = await Questions.find(query);
        res.json(q);
    } catch (error) {
        console.log(error)
        res.json({ error });
    }
}

export async function getQuestionsByTopicAndLevel(req, res) {
    try {
        const { topic, level } = req.params;
        const query = {};
        if (topic) {
            query.topic = topic;
        }
        if (level) {
            query.level = parseInt(level);
        }
        const questions = await Questions.find(query);
        res.json(questions);
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}


// insert all questions 
export async function insertQuestions(req, res) {
    try {
        const questionData = req.body;

        if (!questionData || !questionData.topic || !questionData.level || !questionData.question || !questionData.options || !questionData.answer) {
            return res.status(400).json({ error: "Invalid request body. Make sure all required fields are provided." });
        }

        await Questions.create(questionData);
        res.json({ msg: "Data Saved Successfully...!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while saving data." });
    }
}



// delete all questions
export async function deleteQuestions(req, res) {
    try {
        await Questions.deleteMany()
        res.json({msg: "Questions deleted successfully"})
    } catch (error) {
        res.json({error})
    }
}

// // get results

// export async function getResult(req, res) {
//     try {
//         const r = await Results.find()
//         res.json(r)
//     } catch (error) {
//         res.json({error})
//     }
// }

// // post results
// export async function storeResult(req, res) {
//     try {
//         const { username, result, attempts, points, achieved } = req.body;
//         if (!username || !result) {
//             throw new Error('Data Not Provided...!');
//         }

//         const createdResult = await Results.create({ username, result, attempts, points, achieved });
//         res.json({ msg: "Result Saved Successfully...!", data: createdResult });

//     } catch (error) {
//         res.json({ error: error.message });
//     }
// }

// // delete results
// export async function deleteResult(req, res) {
//     try {
//         await Results.deleteMany()
//         res.json({ msg: "Result deleted successfully"})
//     } catch (error) {
//         res.json({ error })
//     }
// }