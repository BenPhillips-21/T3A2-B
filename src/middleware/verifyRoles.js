// Middleware function to verify user roles
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) {
            return res.sendStatus(401); // Return a 401 Unauthorized status if roles are missing from the request
        }

        const rolesArray = [...allowedRoles]; // Create an array of allowed roles from the arguments
        console.log('Allowed Roles Array:', rolesArray);
        console.log('User Roles:', req.roles); // Log the user's roles from the request

        // Check if there is a matching role between allowedRoles and user roles
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        console.log('Role Matching Result:', result);

        // If no matching role is found, return a 401 Unauthorized status
        if (!result) {
            return res.sendStatus(401);
        }

        next(); // Call the next middleware or route handler if a matching role is found
    };
};

export default verifyRoles;

