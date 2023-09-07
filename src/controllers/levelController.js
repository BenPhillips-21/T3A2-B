import userModel from '../models/userSchema.js';

// Function to update a user's level or stats
export async function levelUp(req, res) {
    const username = req.params.username; // Get the username from req.params
    const updatedLevels = req.body; // Get the updated user stats from req.body

    try {
        // Find and update the user's document in the database
        const updatedUser = await userModel.findOneAndUpdate(
            { username: username }, // Find user by their username
            { userStats: updatedLevels }, // Update the user's stats with the provided data
            { new: true } // Return the updated user document
        );

        // If the user is not found, return a 404 error
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return a 200 OK response with the updated user data
        return res.status(200).json(updatedUser);
    } catch (error) {
        // Handle server errors and return a 500 Internal Server Error response if an error occurs
        return res.status(500).json({ message: 'Server error' });
    }
}
