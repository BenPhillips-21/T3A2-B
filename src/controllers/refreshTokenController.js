import userModel from '../models/userSchema.js'
import jwt from 'jsonwebtoken'


export async function handleRefreshLogin (req, res){
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt

    const foundUser = await userModel.findOne({ refreshToken }).exec()
    if (!foundUser) return res.sendStatus(403); //FORBIDDEN

    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403)
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "UserInfo": { 
                        "username": decoded.username,
                        "roles": roles
                        } 
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '90s'}
                )
                res.json({ accessToken })
        }
    )
    }
