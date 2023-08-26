import usersData from '../models/users.json' assert { type: "json" };
import userModel from '../models/userSchema.js'
import bcrypt from 'bcrypt'


export async function handleNewUser(req, res) {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = await userModel.findOne({ username: user }).exec()
    if (duplicate) return res.sendStatus(409); // Conflict 
    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // create and store new user
        const result = await userModel.create({ 
            "username": user,
            "password": hashedPwd,
             });
        console.log(result)
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}