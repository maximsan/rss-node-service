const router = require('express').Router({ mergeParams: true });
const TasksService = require('./task.service');
const { mapTask } = require('./task.model');
const memoryDB = require('../../common/memoryDB');
const TasksRepository = require('./task.memory.repository');
const TaskRepo = new TasksRepository(memoryDB);
const TaskServ = new TasksService(TaskRepo);

router.route('/').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await TaskServ.getAll(boardId);

  res.send(tasks);
});

router.route('/:id').get(async (req, res) => {
  const { boardId, id } = req.params;

  try {
    const task = await TaskServ.get(id, boardId);
    res.send(task);
  } catch {
    res.status(404).send('Not found');
  }
});

router.route('/').post(async (req, res) => {
  const { boardId } = req.params;
  const { body: task } = req;
  const createdTask = await TaskServ.create(mapTask(task, boardId));

  res.send(createdTask);
});

router.route('/:id').put(async (req, res) => {
  const { boardId, id } = req.params;
  const { body: task } = req;
  const newTask = await TaskServ.update(id, boardId, task);

  res.send(newTask);
});

router.route('/:id').delete(async (req, res) => {
  const { boardId, id } = req.params;

  try {
    await TaskServ.remove(id, boardId);
    res.status(200).send();
  } catch {
    res.status(404).send('Not found');
  }
});

module.exports = router;
