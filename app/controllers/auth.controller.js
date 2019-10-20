// Fixed заменил let на const  в jwt, conf, userService и const на let в user
const jwt = require('jsonwebtoken');
const conf = require('../config');
const userService = require('../services/users.services');

module.exports = {
    login: async (req, res, next) => {
        let user;
        try {
            user = await userService.getOneUser(req.body);

            if (!user) {
                user = await userService.createUser(req.body);
            }

            const jwtToken = await new Promise((resolve, reject) => {
                jwt.sign({ _id: user._id }, conf.JWT_SECRET, (err, token) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(token);
                    }
                });
            });

            res.status(200).send({
                token: jwtToken,
                user,
            });
        } catch (error) {
            next(error);
        }
    },

    checkAuth: (req, res) => {
        res.status(200).send({ user: req.user });
    },
};
