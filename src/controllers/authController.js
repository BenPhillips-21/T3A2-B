import userModel from '../models/userSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function handleLogin (req, res){
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    
    const foundUser = await userModel.findOne({ username: user }).exec()
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles)
        // create JWTs
        const accessToken = jwt.sign(
            { "UserInfo":
            { "username": foundUser.username, 
                "roles": roles }
             },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        // saving refresh token with current user
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()
        console.log(result)

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000}) // remember to readd secure: true for production
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

