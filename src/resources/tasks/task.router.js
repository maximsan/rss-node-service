const router = require('express').Router({ mergeParams: true });
const TasksService = require('./task.service');
const { mapTask } = require('./task.model');
const { Task } = require('./task.model');
const TasksRepository = require('./task.db.repository');
const asyncMiddleware = require('../../common/asyncErrorMiddleware');
const { toResponse } = require('./task.model');

const TaskRepo = new TasksRepository(Task);
const TaskServ = new TasksService(TaskRepo);

router.route('/').get(
  asyncMiddleware(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await TaskServ.getAll(boardId);

    res.send(tasks.map(task => toResponse(task)));
  })
);

router.route('/:id').get(
  asyncMiddleware(async (req, res) => {
    const { boardId, id } = req.params;
    const task = await TaskServ.get(id, boardId);

    res.send(toResponse(task));
  })
);

router.route('/').post(
  asyncMiddleware(async (req, res) => {
    const { boardId } = req.params;
    const { body: task } = req;
    const createdTask = await TaskServ.create(mapTask(task, boardId));

    res.send(toResponse(createdTask));
  })
);

router.route('/:id').put(
  asyncMiddleware(async (req, res) => {
    const { boardId, id } = req.params;
    const { body: task } = req;
    const newTask = await TaskServ.update(id, boardId, task);

    res.send(toResponse(newTask));
  })
);

router.route('/:id').delete(
  asyncMiddleware(async (req, res) => {
    const { boardId, id } = req.params;
    await TaskServ.remove(id, boardId);

    res.status(200).send();
  })
);

module.exports = router;
