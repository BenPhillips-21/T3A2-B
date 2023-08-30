const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // if (!req?.roles) return res.sendStatus(401);
        
        const rolesArray = [...allowedRoles];
        console.log('Allowed Roles Array:', rolesArray);
        console.log('User Roles:', req.roles);
        
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        console.log('Role Matching Result:', result);

        if (!result) return res.sendStatus(401);
        next();
    };
};

export default verifyRoles;
