const jwt = require('jsonwebtoken');

function checkcurrentokent(req, res, next) {
    const Authorization = req.header('authorization');
    if (!Authorization) {
        req.user = null;
        next();
        console.log('loi')
    }

    const token = Authorization.replace('bearer ', '');
    try {
        const { userId } = jwt.verify(token, process.env.APP_SECRET);

        // Assign to req
        req.user = { userId };
        // Continue to the next middleware
        
        next();
    } catch (error) {
        req.user = null;
        next();
    }

}

module.exports = checkcurrentokent;