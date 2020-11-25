const { createContainer, asClass, asValue } = require('awilix');
const UserService = require('../resources/users/user.service');
const UserRepository = require('../resources/users/user.db.repository');
const UserController = require('../resources/users/user.controller');
const LoginService = require('../resources/login/login.service');
const TaskRepository = require('../resources/tasks/task.db.repository');
const BoardRepository = require('../resources/boards/board.db.repository');
const TaskService = require('../resources/tasks/task.service');
const BoardService = require('../resources/boards/board.service');
const TaskController = require('../resources/tasks/task.controller');
const BoardController = require('../resources/boards/board.controller');
const { Board } = require('../resources/boards/board.model');
const { Task } = require('../resources/tasks/task.model');
const { User } = require('../resources/users/user.model');

const container = createContainer();

container.register({
  taskModel: asValue(Task),
  userModel: asValue(User),
  boardModel: asValue(Board),
  taskRepository: asClass(TaskRepository),
  boardRepository: asClass(BoardRepository),
  userRepository: asClass(UserRepository),
  userService: asClass(UserService),
  taskService: asClass(TaskService),
  boardService: asClass(BoardService),
  userController: asClass(UserController).singleton(),
  taskController: asClass(TaskController).singleton(),
  boardController: asClass(BoardController).singleton(),
  loginService: asClass(LoginService)
});

module.exports = {
  container
};
