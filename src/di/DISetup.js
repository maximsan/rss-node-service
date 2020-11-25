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

const setupIoCContainer = () => {
  container.register({
    taskModel: asValue(Task),
    userModel: asValue(User),
    boardModel: asValue(Board),
    taskRepository: asClass(TaskRepository).scoped(),
    boardRepository: asClass(BoardRepository).scoped(),
    userRepository: asClass(UserRepository).scoped(),
    userService: asClass(UserService).scoped(),
    taskService: asClass(TaskService).scoped(),
    boardService: asClass(BoardService).scoped(),
    userController: asClass(UserController).scoped(),
    taskController: asClass(TaskController).scoped(),
    boardController: asClass(BoardController).scoped(),
    loginService: asClass(LoginService)
  });
};

module.exports = {
  container,
  setupIoCContainer
};
