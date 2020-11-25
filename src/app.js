const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { setupIoCContainer } = require('./di/DISetup');

setupIoCContainer();

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const errorHandler = require('./common/errorHandler');
const cors = require('cors');
const helmet = require('helmet');
const { authorizeMiddleware } = require('./common/authorizeMiddleware');
const { morganLogger, logErrorSync } = require('./common/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(morganLogger);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(authorizeMiddleware);

app.use('/login', loginRouter);

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use(errorHandler);

process.on('uncaughtException', (error, origin) => {
  const message = `Origin: ${origin}; Message: ${error.message}\n`;
  logErrorSync(message);

  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  logErrorSync(`${reason.message} \n`);
});

module.exports = app;
