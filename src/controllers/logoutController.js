import usersData from '../models/users.json' assert { type: "json" };
import userModel from '../models/userSchema.js'



export async function handleLogout (req, res){
    // On client, also delete the accessToken!!
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt


    const foundUser = await userModel.findOne({ refreshToken }).exec()
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true})   
        return res.sendStatus(204); //FORBIDDEN
    }
    // Delete the refresh token
    foundUser.refreshToken = ''
    const result = await foundUser.save()
    console.log(result)

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true}) // secure: true only serves on https
    res.sendStatus(204)
    }