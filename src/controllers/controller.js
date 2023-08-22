import Questions from "/home/ben/projects/js/T3A2-B/src/models/questionSchema.js";
import Results from "/home/ben/projects/js/T3A2-B/src/models/resultSchema.js"
import questions, { answers } from '/home/ben/projects/js/T3A2-B/src/database/data.js'


// get all questions
// export async function getQuestions(req, res){
//     try {
//         const q = await Questions.find()
//         res.json(q)
//     } catch (error) {
//         res.json({error})
//     }
// }

export async function getQuestions(req, res) {
    try {
        const topic = req.params.topic; 
        const query = topic ? { topic } : {}; 
        const q = await Questions.find(query);
        res.json(q);
    } catch (error) {
        res.json({ error });
    }
}

export async function getQuestionsByTopic(req, res) {
    try {
        const topic = req.params.topic;
        const query = topic ? { topic } : {};
        const q = await Questions.find(query);
        res.json(q);
    } catch (error) {
        res.json({ error });
    }
}


// insert all questions 
export async function insertQuestions(req, res){
    try {
        await Questions.insertMany({ questions, answers });
        res.json({ msg: "Data Saved Successfully...!" });
    } catch (error) {
        res.json({ error });
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

// get results

export async function getResult(req, res) {
    try {
        const r = await Results.find()
        res.json(r)
    } catch (error) {
        res.json({error})
    }
}

// post results
export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achieved } = req.body;
        if (!username || !result) {
            throw new Error('Data Not Provided...!');
        }

        const createdResult = await Results.create({ username, result, attempts, points, achieved });
        res.json({ msg: "Result Saved Successfully...!", data: createdResult });

    } catch (error) {
        res.json({ error: error.message });
    }
}

// delete results
export async function deleteResult(req, res) {
    try {
        await Results.deleteMany()
        res.json({ msg: "Result deleted successfully"})
    } catch (error) {
        res.json({ error })
    }
}