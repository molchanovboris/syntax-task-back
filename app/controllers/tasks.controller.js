// Fixed заменил let на const
const TasksServices = require('../services/tasks.services');

module.exports = {
    addTask: async (req, res, next) => {
        const { name, priority } = req.body;

        const data = {
            name,
            priority,
            active: true,
            progress: Math.floor(Math.random() * 100), // randomize progress
            commentsAmount: Math.floor(Math.random() * 10), // randomize commentsAmount
            userId: req.user._id,
        };
        try {
            const newTask = await TasksServices.createTask(data);
            res.status(200).json({ result: newTask });
        } catch (error) {
            next(error);
        }
    },
    getTasks: async (req, res, next) => {
        const query = { userId: req.user._id };
        try {
            const tasks = await TasksServices.getTasks(query);
            res.status(200).json({ result: tasks });
        } catch (error) {
            next(error);
        }
    },
    updateTask: async (req, res, next) => {
        const query = { _id: req.params.id }; // todo: change to userID from token
        const data = {
            $set: {
                active: req.body.active,
                updatedAt: new Date(),
            },
        };
        try {
            const result = await TasksServices.updateTask(query, data);
            res.status(200).json({ result });
        } catch (error) {
            next(error);
        }
    },
    deleteTask: async (req, res, next) => {
        const query = { _id: req.params.id };
        try {
            const result = await TasksServices.deleteTask(query);

            if (!result.deletedCount) {
                throw new Error('task not found');
            } else {
                res.status(200).json({ result });
            }
        } catch (error) {
            next(error);
        }
    },
};
