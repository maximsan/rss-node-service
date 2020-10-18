const { NotFoundError } = require('../../common/customErrors');

class TaskService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll(boardId) {
    return this.repository.getAll(boardId);
  }

  async get(id, boardId) {
    const task = await this.repository.get(id, boardId);

    if (!task) {
      throw new NotFoundError(`The task with id${id} was not found`);
    }

    return task;
  }

  async create(task) {
    return this.repository.create(task);
  }

  async update(id, boardId, task) {
    return this.repository.update(id, boardId, task);
  }

  async remove(id, boardId) {
    this.repository.remove(id, boardId);
  }
}

module.exports = TaskService;
