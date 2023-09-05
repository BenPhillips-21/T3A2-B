import userModel from '../models/userSchema.js'


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

