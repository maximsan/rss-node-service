const router = require('express').Router();
const boardsService = require('./board.service');
const { mapBoard } = require('./board.model');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();

  res.send(boards);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;

  try {
    const board = await boardsService.get(id);
    res.send(board);
  } catch {
    res.status(404).send('Not found');
  }
});

router.route('/').post(async (req, res) => {
  const { body: board } = req;
  const createdBoard = await boardsService.create(mapBoard(board));
  res.send(createdBoard);
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { body: board } = req;
  const newBoard = await boardsService.update(id, board);

  res.send(newBoard);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  try {
    await boardsService.remove(id);
    res.status(200).send();
  } catch (error) {
    res.status(404).send('Not found');
  }
});

module.exports = router;
