const router = require("express").Router();

const {
    get_todos,
    get_todosOne,
    post_todos,
    delete_todos,
    update_todosOne,
} = require("../controllers/todos");

// todos Routes
router.get("/api/todos", get_todos);
router.post("/api/todos", post_todos);
router.get("/api/todos/:id", get_todosOne);
router.delete("/api/todos", delete_todos);
router.patch("/api/todos/:id", update_todosOne);

module.exports = router;
