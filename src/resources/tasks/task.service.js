const tasksRepo = require('./task.memory.repository');
const { NotFoundError } = require('../../common/customErrors');

const getAll = async boardId => {
  return await tasksRepo.getAll(boardId);
};

const get = async (id, boardId) => {
  const task = await tasksRepo.get(id, boardId);

  if (!task) {
    throw new NotFoundError(`The task with id${id} was not found`);
  }

  return task;
};

const create = async task => {
  return await tasksRepo.create(task);
};

const update = async (id, boardId, task) => {
  return await tasksRepo.update(id, boardId, task);
};

const remove = async (id, boardId) => await tasksRepo.remove(id, boardId);

module.exports = {
  getAll,
  get,
  update,
  create,
  remove
};
