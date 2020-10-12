const memoryDB = require('../../common/memoryDB');
const { NotFoundError } = require('../../common/customErrors');

const getAll = async () => {
  return await memoryDB.getAll(memoryDB.entities.USERS);
};

const get = async id => {
  const user = await memoryDB.get(memoryDB.entities.USERS, id);

  if (!user) {
    throw new NotFoundError(`User with id: ${id} was not found`);
  }

  return user;
};

const create = async user => {
  return await memoryDB.create(memoryDB.entities.USERS, user);
};

const update = async (id, user) => {
  const newUser = await memoryDB.update(memoryDB.entities.USERS, id, user);

  if (!newUser) {
    throw new NotFoundError(`User with id: ${id} was not found`);
  }

  return newUser;
};

const remove = async id => {
  const userTasks = (await memoryDB.getAll(memoryDB.entities.TASKS)).filter(
    ({ userId }) => id === userId
  );

  await Promise.all(
    userTasks.map(task => {
      return memoryDB.update(memoryDB.entities.TASKS, task.id, {
        ...task,
        userId: null
      });
    })
  );

  await memoryDB.remove(memoryDB.entities.USERS, id);
};

module.exports = { getAll, get, create, update, remove };
