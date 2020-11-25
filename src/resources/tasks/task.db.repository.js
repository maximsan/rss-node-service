const { NotFoundError } = require('../../common/customErrors');

class TaskRepository {
  constructor({ taskModel }) {
    this.taskModel = taskModel;
  }

  async getAll(boardId) {
    return this.taskModel.find({ boardId });
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
    return this.taskModel.create(task);
  }

  async update(id, boardId, task) {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, task, {
      new: true
    });

    if (!updatedTask) {
      throw new NotFoundError(
        `Task with id: ${id} on board: ${boardId} was not found`
      );
    }

    return updatedTask;
  }

  async remove(id, boardId) {
    // check if task exit
    const task = await this.get(id, boardId);

    if (!task) {
      throw new NotFoundError(
        `Task with id: ${id} on board with id: ${boardId} was not found`
      );
    }

    return this.taskModel.deleteOne({ _id: task.id });
  }
}

module.exports = TaskRepository;
