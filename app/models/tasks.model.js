const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    progress: {
        type: Number,
        default: 0,
    },
    commentsAmount: {
        type: Number,
        default: 0,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});

module.exports = mongoose.model('Task', taskSchema);
