const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    // Access authorization from req header
    const Authorization = req.header('authorization');

    if (!Authorization) {
        // Handle the case where Authorization is not present
        const err = new Error('Unauthorized!');
        err.statusCode = 401;
        return next(err);
        //return;
    }

    // Get token
    const token = Authorization.replace('bearer ', '');

    // Verify token
    try {
        const { userId } = jwt.verify(token, process.env.APP_SECRET);

        // Assign to req
        req.user = { userId };
        // Continue to the next middleware
        next();
    } catch (error) {
        // Handle the case where token verification fails
        const err = new Error('Invalid token!');
        err.statusCode = 401;
        return next(err);
    }
}

module.exports = { verifyToken };
