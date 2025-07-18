const Task = require("../models/task");

// POST /api/tasks
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({ 
            ...req.body, 
            ownershp: req.user.id    // ✅ use the correct field
        });
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// GET /api/tasks/me
exports.getMyTasks = async (req, res) => {
    const tasks = await Task.find({ ownershp: req.user.id }); // ✅ match the correct field
    res.json(tasks);
};

// GET /api/tasks/all
exports.getAllTasks = async (req, res) => {
    const tasks = await Task.find().populate("ownershp", "email"); // ✅ match the correct field
    res.json(tasks);
};
// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, ownershp: req.user.id },  // make sure only owner can update
      { completed: req.body.completed },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, ownershp: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

