const { toResponse } = require('./task.model');
const { mapTask } = require('./task.model');

class TaskController {
  constructor({ taskService }) {
    this.taskService = taskService;
  }

  async get(req, res) {
    const { boardId } = req.params;

    console.log('boardId', boardId);
    const tasks = await this.taskService.getAll(boardId);

    console.log('tasks', tasks);
    res.send(tasks.map(task => toResponse(task)));
  }

  async getById(req, res) {
    const { boardId, id } = req.params;

    console.log('boardId', boardId);
    console.log('id', id);
    const task = await this.taskService.get(id, boardId);

    console.log('task', task);
    res.send(toResponse(task));
  }

  async post(req, res) {
    const { boardId } = req.params;
    const { body: task } = req;

    console.log('boardId', boardId);
    console.log('task', task);
    const createdTask = await this.taskService.create(mapTask(task, boardId));

    console.log('createdTask', createdTask);
    res.send(toResponse(createdTask));
  }

  async put(req, res) {
    const { boardId, id } = req.params;
    const { body: task } = req;

    const newTask = await this.taskService.update(id, boardId, task);

    res.send(toResponse(newTask));
  }

  async delete(req, res) {
    const { boardId, id } = req.params;

    await this.taskService.remove(id, boardId);

    res.status(200).send();
  }
}

module.exports = TaskController;
