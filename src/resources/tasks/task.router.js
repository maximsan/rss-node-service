const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const { mapTask } = require('./task.model');

router.route('/').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAll(boardId);

  res.send(tasks);
});

router.route('/:id').get(async (req, res) => {
  const { boardId, id } = req.params;
  const task = await tasksService.get(id, boardId);

  res.send(task);
});

router.route('/').post(async (req, res) => {
  const { boardId } = req.params;
  const { body: task } = req;
  const createdTask = await tasksService.create(mapTask(task, boardId));

  res.send(createdTask);
});

router.route('/:id').put(async (req, res) => {
  const { boardId, id } = req.params;
  const { body: task } = req;
  const newTask = await tasksService.update(id, boardId, task);

  res.send(newTask);
});

router.route('/:id').delete(async (req, res) => {
  const { boardId, id } = req.params;

  try {
    await tasksService.remove(id, boardId);

    res.status(200).send();
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
