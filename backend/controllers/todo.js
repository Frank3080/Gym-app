const todosRouter = require("express").Router();
const Todo = require("../models/todo");

todosRouter.get("/", async (request, response) => {
  const todos = await Todo.find({});
  response.json(todos);
});

todosRouter.post("/", async (request, response) => {
  const { value } = request.body;

  if (!value) {
    return response.status(400).json({ error: "value is required" });
  }

  const todo = new Todo({ value });
  const savedTodo = await todo.save();
  response.status(201).json(savedTodo);
});

todosRouter.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    if (!id) {
      return response.status(400).json({ error: "Invalid or missing ID" });
    }
    await Todo.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    console.error("Error in delete route handler:", error.message);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = todosRouter;
