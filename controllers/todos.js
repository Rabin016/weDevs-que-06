const Todo = require("../models/index");

module.exports.get_todos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).send(todos);
    } catch (err) {
        res.status(400).send({ err, dangerMsg: "Todo List cant be found" });
    }
};

module.exports.get_todosOne = async (req, res) => {
    try {
        const todos = await Todo.findById(req.params.id);
        res.status(200).json(todos);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.post_todos = async (req, res) => {
    const { todoName } = req.body;

    try {
        const newTodos = await Todo.create({ todoName });
        res.status(201).send({ sucMsg: "New Todo added!" });
        console.log("it works");
    } catch (err) {
        res.status(400).send({ err, dangerMsg: "New Todo not added" });
    }
};

module.exports.delete_todos = async (req, res) => {
    try {
        const todos = await Todo.deleteMany({
            _id: { $in: req.body.ids },
        });
        res.status(200).send({ sucMsg: "Todo deleted!", man: req.body });
    } catch (err) {
        res.status(400).send({ err, dangerMsg: "Todo not deleted" });
        console.log(err);
    }
};

module.exports.update_todosOne = async (req, res) => {
    try {
        const { todoName, completed } = req.body;
        const todos = await Todo.updateOne(
            { _id: req.params.id },
            { $set: { todoName, completed } }
        );
        res.status(200).send({ sucMsg: "Todo Updated!" });
    } catch (err) {
        res.status(400).send({ err, dangerMsg: "Todo not deleted" });
    }
};
