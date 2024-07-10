const express = require('express');
const router = express();

// controllers
const {getTasks, getTaskById, createTask, editTask, editColorTask, favoriteTask, deleteTask, deleteAllTasks} = require('../controllers/taskController');

// routers
router.get('/tasks', getTasks);
router.get('/task/:id', getTaskById);

router.post('/task', createTask);

router.patch('/task/:id', editTask);
router.patch('/task/color/:id', editColorTask);
router.patch('/task/favorite/:id', favoriteTask);

router.delete('/task/:id', deleteTask);
router.delete('/tasks', deleteAllTasks);

router.get('/', (req, res) => {
  res.send('API ONLINE');
});

module.exports = router;