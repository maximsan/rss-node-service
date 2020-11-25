const { NotFoundError } = require('../../common/customErrors');

class TaskService {
  constructor({ taskRepository }) {
    this.repository = taskRepository;
  }

  async getAll(boardId) {
    return this.repository.getAll(boardId);
  }

  async get(id, boardId) {
    const task = await this.repository.get(id, boardId);

    if (!task) {
      throw new NotFoundError(`The task with id: ${id} was not found`);
    }

    return task;
  }

  async create(task) {
    console.log('taskRepository', task);
    return this.repository.create(task);
  }

  async update(id, boardId, task) {
    return this.repository.update(id, boardId, task);
  }

  async remove(id, boardId) {
    return this.repository.remove(id, boardId);
  }
}

module.exports = TaskService;
