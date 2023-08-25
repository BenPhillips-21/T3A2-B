import usersData from '../models/users.json' assert { type: "json" };

const usersDB = {
    users: usersData,
    setUsers: function (data) { this.users = data }
}
import fsPromises from 'fs/promises';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


export async function handleLogout (req, res){
    // On client, also delete the accessToken!!
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt


    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })   
        return res.sendStatus(204); //FORBIDDEN
    }
    // Delete the refresh token
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)
    const currentUser = {...foundUser, refreshToken: ''}
    usersDB.setUsers([...otherUsers, currentUser])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'users.json'),
        JSON.stringify(usersDB.users)
    )
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }) // secure: true only serves on https
    res.sendStatus(204)
    }