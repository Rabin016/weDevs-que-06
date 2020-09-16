const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    todoName: {
        required: true,
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
