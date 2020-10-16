const router = require('express').Router();
const BoardService = require('./board.service');
const { mapBoard } = require('./board.model');

const memoryDB = require('../../common/memoryDB');
const BoardRepository = require('./board.memory.repository');

const BoardRepo = new BoardRepository(memoryDB);
const BoardServ = new BoardService(BoardRepo);

router.route('/').get(async (req, res) => {
  const boards = await BoardServ.getAll();

  res.send(boards);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;

  try {
    const board = await BoardServ.get(id);
    res.send(board);
  } catch {
    res.status(404).send('Not found');
  }
});

router.route('/').post(async (req, res) => {
  const { body: board } = req;
  const createdBoard = await BoardServ.create(mapBoard(board));
  res.send(createdBoard);
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { body: board } = req;
  const newBoard = await BoardServ.update(id, board);

  res.send(newBoard);
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  try {
    await BoardServ.remove(id);
    res.status(200).send();
  } catch (error) {
    res.status(404).send('Not found');
  }
});

module.exports = router;
