const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'TASK',
    order = 0,
    description = 'TEST TASK',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

const createTask = () => {
  return new Task();
};

const mapTask = ({ title, order, description, userId, columnId }, boardId) => {
  return new Task({ title, order, description, userId, boardId, columnId });
};

module.exports = {
  Task,
  createTask,
  mapTask
};
