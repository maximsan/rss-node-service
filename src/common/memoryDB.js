const { createTask } = require('../resources/tasks/task.model');
const { createBoard } = require('../resources/boards/board.model');
const { createNewUser } = require('../resources/users/user.model');

const entities = {
  USERS: 'users',
  BOARDS: 'boards',
  TASKS: 'tasks'
};

const memoryDB = {
  users: [],
  boards: [],
  tasks: []
};

const getRandomIndex = length => {
  return Math.floor(Math.random() * length);
};

const initDB = () => {
  for (let i = 0; i < 5; i++) {
    memoryDB[entities.USERS].push(createNewUser());
    memoryDB[entities.BOARDS].push(createBoard());
  }
  for (let i = 0; i < 10; i++) {
    memoryDB[entities.TASKS].push(createTask());
  }
  for (let j = 0; j < 10; j++) {
    const board = memoryDB[entities.BOARDS][getRandomIndex(5)];
    memoryDB[entities.TASKS][j].boardId = board.id;

    const user = memoryDB[entities.USERS][getRandomIndex(5)];
    memoryDB[entities.TASKS][j].userId = user.id;

    const column = memoryDB[entities.BOARDS][getRandomIndex(5)];
    memoryDB[entities.TASKS][j].columnId = column.id;
  }
};

initDB();

const getAll = async entity => memoryDB[entity];

const get = async (entity, entityId) => {
  return (await getAll(entity)).find(({ id }) => id === entityId);
};

const create = async (entity, entityData) => {
  memoryDB[entity].push(entityData);
  return entityData;
};

const update = async (entity, entityId, newEntityData) => {
  const oldEntityData = await get(entity, entityId);
  const entityData = { ...oldEntityData, ...newEntityData };

  const index = memoryDB[entity].indexOf(oldEntityData);
  memoryDB[entity][index] = entityData;

  return entityData;
};

const remove = async (entity, entityId) => {
  const indexToRemove = memoryDB[entity].findIndex(({ id }) => id === entityId);
  memoryDB[entity].splice(indexToRemove, 1);
};

module.exports = {
  entities,
  getAll,
  get,
  create,
  update,
  remove
};
