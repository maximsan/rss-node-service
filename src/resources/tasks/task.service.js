const tasksRepo = require('./task.memory.repository');

const getAll = async boardId => {
  return await tasksRepo.getAll(boardId);
};

const get = async (id, boardId) => {
  return await tasksRepo.get(id, boardId);
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
