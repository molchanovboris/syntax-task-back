const User = require('../models/users.model');
// Fixed заменил const userService на module.exports
// Fixed добавил async await
module.exports = {
    getUsers: async () => {
        try {
            const users = await User.find({});
            return users;
        } catch (error) {
            throw new Error(error);
        }
    },
    getOneUser: async (query) => {
        try {
            const user = await User.findOne(query);
            return user;
        } catch (error) {
            throw new Error(error);
        }
    },
    createUser: async (data) => {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            throw new Error(error);
        }
    },
};
