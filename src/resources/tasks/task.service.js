const { NotFoundError } = require('../../common/customErrors');

class TaskService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll(boardId) {
    return await this.repository.getAll(boardId);
  }

  async get(id, boardId) {
    const task = await this.repository.get(id, boardId);

    if (!task) {
      throw new NotFoundError(`The task with id${id} was not found`);
    }

    return task;
  }

  async create(task) {
    return await this.repository.create(task);
  }

  async update(id, boardId, task) {
    return await this.repository.update(id, boardId, task);
  }

  async remove(id, boardId) {
    await this.repository.remove(id, boardId);
  }
}

module.exports = TaskService;
