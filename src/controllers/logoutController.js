export async function handleLogout(req, res) {
    // Clear the access token cookie if it exists
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.json("User Logged Out")
}
