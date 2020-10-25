const mongoose = require('mongoose');

const createTask = () => {
  return new Task();
};

const mapTask = ({ title, order, description, userId, columnId }, boardId) => {
  return new Task({ title, order, description, userId, boardId, columnId });
};

const toResponse = ({
  id,
  title,
  order,
  description,
  userId,
  columnId,
  boardId
}) => {
  return { id, title, order, description, userId, columnId, boardId };
};

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  { collection: 'tasks' }
);

const Task = mongoose.model('tasks', taskSchema);

module.exports = {
  Task,
  createTask,
  mapTask,
  toResponse
};
