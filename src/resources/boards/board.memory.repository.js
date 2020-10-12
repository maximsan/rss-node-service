const memoryDB = require('../../common/memoryDB');
const tasksRepository = require('../tasks/task.memory.repository');
const { NotFoundError } = require('../../common/customErrors');

const getAll = async () => {
  return await memoryDB.getAll(memoryDB.entities.BOARDS);
};

const get = async id => {
  return await memoryDB.get(memoryDB.entities.BOARDS, id);
};

const create = async board => {
  return await memoryDB.create(memoryDB.entities.BOARDS, board);
};

const update = async (id, board) => {
  const newBoard = await memoryDB.update(memoryDB.entities.BOARDS, id, board);

  if (!newBoard) {
    throw new NotFoundError(`The board with id ${id} was not found`);
  }

  return newBoard;
};

const remove = async id => {
  const boardTasks = await tasksRepository.getAll(id);

  await Promise.all(
    boardTasks.map(task => {
      return tasksRepository.remove(task.id, id);
    })
  );

  await memoryDB.remove(memoryDB.entities.BOARDS, id);
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
