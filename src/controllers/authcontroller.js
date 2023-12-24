const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class Athentication {
    async register(req, res, next) {
        try {
            const user = await User.create(req.body);
            const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
            res.status(200).json({
                status: 'sucess',
                data: { token, 
                userName: user.name },
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                const err = new Error('Username is not correct');
                err.statusCode = 400;
                return next(err);
            }
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
                res.status(200).json({
                    status: 'sucess',
                    data: {
                        token,
                        userName: user.name,
                    }
                })
            } else {
                const err = new Error('Password is not correct');
                err.statusCode = 400;
                return next(err);
            }
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new Athentication;