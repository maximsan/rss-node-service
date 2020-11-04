const { Task } = require('../resources/tasks/task.model');
const { getRandomIndex } = require('./memoryDB');
const { Board } = require('../resources/boards/board.model');
const { User } = require('../resources/users/user.model');

const users = [
  new User({ name: 'USER 1', login: 'user1', password: 'P@55w0rd' }),
  new User({ name: 'USER 2', login: 'user2', password: 'P@55w0rd' }),
  new User({ name: 'USER 3', login: 'user3', password: 'P@55w0rd' }),
  new User({ name: 'USER 4', login: 'user4', password: 'P@55w0rd' }),
  new User({ name: 'USER 5', login: 'user5', password: 'P@55w0rd' })
];

const admin = new User({ name: 'admin', login: 'admin', password: 'admin' });

const boards = [
  new Board({ title: 'BOARD 1', columns: [] }),
  new Board({ title: 'BOARD 2', columns: [] }),
  new Board({ title: 'BOARD 3', columns: [] })
];

const tasks = [
  new Task({ title: 'TASK 1', order: 0, description: 'TASK 1 desc' }),
  new Task({ title: 'TASK 2', order: 1, description: 'TASK 2 desc' }),
  new Task({ title: 'TASK 3', order: 4, description: 'TASK 3 desc' }),
  new Task({ title: 'TASK 4', order: 2, description: 'TASK 4 desc' }),
  new Task({ title: 'TASK 5', order: 1, description: 'TASK 5 desc' }),
  new Task({ title: 'TASK 6', order: 0, description: 'TASK 6 desc' }),
  new Task({ title: 'TASK 7', order: 1, description: 'TASK 7 desc' }),
  new Task({ title: 'TASK 8', order: 3, description: 'TASK 8 desc' }),
  new Task({ title: 'TASK 9', order: 1, description: 'TASK 9 desc' }),
  new Task({ title: 'TASK 10', order: 0, description: 'TASK 10 desc' })
];

const initTasks = (savedUsers, savedBoards) => {
  for (let j = 0; j < 10; j++) {
    const board = savedBoards[getRandomIndex(3)];
    tasks[j].boardId = board._id;

    const user = savedUsers[getRandomIndex(5)];
    tasks[j].userId = user._id;
  }

  return tasks;
};

const initDB = async db => {
  await db.dropDatabase();
  users.forEach(user => user.save());
  boards.forEach(board => board.save());
  // eslint-disable-next-line no-shadow
  const tasks = initTasks(users, boards);
  tasks.forEach(task => task.save());
};

const addAdmin = () => {
  User.create(admin);
};

module.exports = {
  initDB,
  addAdmin
};
