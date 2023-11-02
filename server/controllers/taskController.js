const Task = require('../models/TaskModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');

exports.getAllTasks = factory.getAll(Task, true);
exports.getTask = factory.getOne(Task);
exports.createTask = factory.createOne(Task);
exports.updateTask = factory.updateOne(Task);
exports.deleteTask = factory.deleteOne(Task);

exports.checkTaskOwnership = async (req, res, next) => {
  try {
    console.log(req.params.id);
    console.log(req.user.id);
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (task.user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.setTaskUserIds = (req, res, next) => {
  // allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
