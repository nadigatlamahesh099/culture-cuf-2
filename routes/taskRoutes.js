const express = require('express');
const router = express.Router();
const Task = require('../backend/TaskModel');

// POST /transactions: Add a new transaction
router.post('/add-task', async (req, res) => {
  const { name, status ,date} = req.body;
  try {
    const newTask = new Task({ name, status,date });
    await newTask.save();
    res.status(201).json(newTask);
    
  } catch (error) {
    res.status(400).json({ error: error.message });
    
  }
});

// GET /transactions: Retrieve all transactions
router.get('/all-tasks', async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// PUT /transactions/:id: Update a specific transaction
router.put('/put/:id', async (req, res) => {
  console.log(req.body.status)
  
  try {
    const updatedTransaction = await Task.findByIdAndUpdate(req.params.id,req.body, { status :req.body.status});
    const allTasks = await Task.find();
    if (!updatedTransaction) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /transactions/:id: Delete a transaction
router.delete('/delete/:id', async (req, res) => {
 
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    const allTasks = await Task.find();
    if (!deleteTask) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json({ message: 'Task deleted',allTasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
