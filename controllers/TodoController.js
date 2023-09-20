// New Express Router
const router = require("express").Router()
const isUserLoggedIn = require("../utils/Auth")

// Index Route "/todo", returns all todos for that user
router.get("/", isUserLoggedIn, async (req, res) => {
  try {
    const Todo = req.context.models.Todo
    res.json(await Todo.find({ username: req.payload.username }))
  } catch (error) {
    res.status(400).json({ error })
  }
})

// Create Route "/todo", creates a new todo
router.post("/", isUserLoggedIn, async (req, res) => {
  try {
    const Todo = req.context.models.Todo
    req.body.username = req.payload.username
    res.json(await Todo.create(req.body))
  } catch (error) {
    res.status(400).json({ error })
  }
})

// explain this code line by line
// Show Route "/todo/:id", returns a single todo
router.get("/:id", isUserLoggedIn, async (req, res) => {
    // grab model from context
    const Todo = req.context.models.Todo
    // grab id from params
    const id = req.params.id
    // find todo by id
    const todo = await Todo.findById(id)
    // respond with todo
    res.json(todo)
})



// destroy Route "/todo/:id", deletes a todo
router.delete("/:id", isUserLoggedIn, async (req, res) => {
  try {
    const Todo = req.context.models.Todo
    const id = req.params.id
    res.json(await Todo.findByIdAndRemove(id))
  } catch (error) {
    res.status(400).json({ error })
  }
})

//export router
module.exports = router