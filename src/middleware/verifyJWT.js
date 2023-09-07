import jwt from 'jsonwebtoken';

// Middleware function to verify a JSON Web Token (JWT) from the request headers
export default function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Check if the Authorization header starts with 'Bearer ' and if a token is present
    if (!authHeader?.startsWith('Bearer ')) {
        return res.sendStatus(401); // Return a 401 Unauthorized status if the token is missing or improperly formatted
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the Authorization header

    // Verify the token using the provided ACCESS_TOKEN_SECRET
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Return a 403 Forbidden status for an invalid token
            }

            // If the token is valid, attach the decoded user information to the request object
            req.user = decoded.UserInfo.username; // Attach the username to req.user
            req.roles = decoded.UserInfo.roles; // Attach the roles to req.roles
            next(); // Call the next middleware or route handler
        }
    );
}

