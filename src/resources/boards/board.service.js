const boardsRepo = require('./board.memory.repository');

const getAll = async () => {
  return await boardsRepo.getAll();
};

const get = async id => {
  return await boardsRepo.get(id);
};

const create = async board => {
  return await boardsRepo.create(board);
};

const update = async (id, board) => {
  return await boardsRepo.update(id, board);
};

const remove = async id => await boardsRepo.remove(id);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
