// Fixed заменил let на const
const userService = require('../services/users.services');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getUsers();
            res.status(400).send({ result: users });
        } catch (error) {
            next(error);
        }
    },
};
