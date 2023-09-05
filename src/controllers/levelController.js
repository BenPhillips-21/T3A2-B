import userModel from '../models/userSchema.js'

// export async function levelUp(req, res) {
//     const username = req.params.username;
//     const topicToIncrement = req.params.topic;

//     const validTopics = ['codingLevel', 'geographyLevel', 'napoleonLevel'];
    
//     if (!validTopics.includes(topicToIncrement)) {
//         return res.status(400).json({ message: 'Invalid topic name' });
//     }

//     try {
//         const user = await userModel.findOneAndUpdate(
//             { username: username },
//             { $inc: { [`userStats.${topicToIncrement}`]: 1 } },
//             { new: true }
//         );

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         return res.status(200).json({ user });
//     } catch (error) {
//         return res.status(500).json({ message: 'Server error' });
//     }
// }

export async function levelUp(req, res) {
    const username = req.params.username;
    const updatedLevels = req.body;

    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { username: username }, 
            { userStats: updatedLevels }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}

