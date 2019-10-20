// Fixed заменил let на const
const jwt = require('jsonwebtoken');
const UserService = require('../services/users.services');
const conf = require('../config');

exports.checkAuth = async (req, res, next) => {
    if (req.method === 'OPTIONS') next();
    if (!req.headers.token) {
        return next({
            name: 'JsonWebTokenError',
            message: 'Unauthorized',
        });
    }

    try {
        const decoded = await jwt.verify(req.headers.token, conf.JWT_SECRET);
        const user = await UserService.getOneUser({ _id: decoded._id });
        if (!user) {
            return next({
                name: 'JsonWebTokenError',
                message: 'Unauthorized',
            });
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
