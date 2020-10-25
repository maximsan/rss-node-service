const { entities } = require('../../db/memoryDB');
const { NotFoundError } = require('../../common/customErrors');

class TaskRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll(boardId) {
    return (await this.model.getAll(entities.TASKS)).filter(
      task => task.boardId === boardId
    );
  }

  async get(id, boardId) {
    const tasks = await this.getAll(boardId);

    if (!tasks.length) {
      throw new NotFoundError(
        `Tasks for board with id: ${boardId} was not found`
      );
    }

    return tasks.find(task => task.id === id);
  }

  async create(task) {
    return this.model.create(entities.TASKS, task);
  }

  async update(id, boardId, task) {
    const newTask = await this.model.update(entities.TASKS, id, task);

    if (!newTask) {
      throw new NotFoundError(
        `Task with id: ${id} on board: ${boardId} was not found`
      );
    }

    return newTask;
  }

  async remove(id, boardId) {
    // check if task exit
    const task = await this.get(id, boardId);

    if (!task) {
      throw new NotFoundError(
        `Task with id: ${id} on board with id: ${boardId} was not found`
      );
    }

    return this.model.remove(entities.TASKS, task.id);
  }
}

module.exports = TaskRepository;
