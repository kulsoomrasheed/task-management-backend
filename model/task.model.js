const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
      
    },
    desc: {
        type: String,
        required: [true, 'Description is required'],
       
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userID:String,
    username:String
    
}, {
    versionKey: false
});

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = { TaskModel };
