const memoryDB = require('../../common/memoryDB');
const { NotFoundError } = require('../../common/customErrors');

const getAll = async boardId => {
  return (await memoryDB.getAll(memoryDB.entities.TASKS)).filter(
    task => task.boardId === boardId
  );
};

const get = async (id, boardId) => {
  const tasks = await getAll(boardId);

  if (!tasks) {
    throw new NotFoundError(
      `Tasks for board with id: ${boardId} was not found`
    );
  }

  return tasks.find(task => task.id === id);
};

const create = async task => {
  return await memoryDB.create(memoryDB.entities.TASKS, task);
};

const update = async (id, boardId, task) => {
  const newTask = await memoryDB.update(memoryDB.entities.TASKS, id, task);

  if (!newTask) {
    throw new NotFoundError(
      `Taks with id: ${id} on board ${boardId} was not found`
    );
  }

  return newTask;
};

const remove = async (id, boardId) => {
  const task = await get(id, boardId);

  await memoryDB.remove(memoryDB.entities.TASKS, task.id);
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove
};
