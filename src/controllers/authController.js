import userModel from '../models/userSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Function to handle user login
export async function handleLogin(req, res) {
    const { user, pwd } = req.body;

    // Check if username and password are provided
    if (!user || !pwd) {
        return res.status(400).json({ 'message': 'Username and password are required.' });
    }

    // Find the user in the database by username
    const foundUser = await userModel.findOne({ username: user }).exec();

    // If user not found, return Unauthorized
    if (!foundUser) {
        return res.sendStatus(401);
    }

    // Evaluate password by comparing the provided password with the stored hashed password
    const match = await bcrypt.compare(pwd, foundUser.password);

    // If passwords match, create an access token
    if (match) {
        // Extract roles from the user object
        const roles = Object.values(foundUser.roles);

        // Create an access token with user information and a short expiration time (15 minutes)
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        // Send the access token and user data in the response
        res.json({ accessToken, foundUser });
    } else {
        // If passwords don't match, return Unauthorized
        res.sendStatus(401);
    }
}

// Function to get a specific user by their username
export async function getSpecificUser(req, res) {
    const { username } = req.params;

    try {
        // Find the user in the database by username
        const user = await userModel.findOne({ username });

        // If user not found, return a 404 error
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        // Send the user data in the response
        res.json(user);
    } catch (error) {
        // Handle errors and return a 500 Internal Server Error if an error occurs
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching user data." });
    }
}
