// Fixed заменил let на const
const Task = require('../models/tasks.model');

module.exports = {
    getTasks: (query) => {
        const tasks = Task.find(query);
        return tasks;
    },
    createTask: (data) => {
        const newTask = Task.create(data);
        return newTask;
    },
    updateTask: (query, data) => {
        const result = Task.findOneAndUpdate(query, data, { new: true });
        return result;
    },
    deleteTask: (query) => {
        const result = Task.deleteOne(query);
        return result;
    },
};
