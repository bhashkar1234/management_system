const mongoose = require('mongoose');
const router = require("express").Router();
const List = require("../models/list");


// Create task
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, category } = req.body;
    const list = new List({ title, body, category });
    await list.save();
    res.status(200).json({ list });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update task
// Update task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, priority, category } = req.body;
    const taskId = req.params.id;

    // Validate task id
    if (!mongoose.isValidObjectId(taskId)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    // Update task
    const updatedTask = await List.findByIdAndUpdate(taskId, { title, body, priority, category }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task Updated", task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Delete task
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get tasks with filtering and sorting
router.get("/getTasks/:id", async (req, res) => {
  try {
    const { sortBy, filterByPriority, filterByCategory } = req.query;
    let query = {};
    if (filterByPriority) {
      query.priority = filterByPriority;
    }
    if (filterByCategory) {
      query.category = filterByCategory;
    }
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = 1; // Sort by ascending order
    }
    const tasks = await List.find(query).sort(sortOptions);
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
