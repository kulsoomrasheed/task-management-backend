const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [50, 'Title cannot exceed 100 characters']
    },
    desc: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    status: {
        type: String,
        default: 'todo'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userID:String
}, {
    versionKey: false
});

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = { TaskModel };
