import usersData from '../models/users.json' assert { type: "json" };
import path from 'path'

const usersDB = {
    users: usersData,
    setUsers: function (data) { this.users = data }
}
import jwt from 'jsonwebtoken'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


export default function handleRefreshLogin (req, res){
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
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