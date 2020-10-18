const router = require('express').Router();
const BoardService = require('./board.service');
const { mapBoard } = require('./board.model');

const memoryDB = require('../../common/memoryDB');
const BoardRepository = require('./board.memory.repository');
const asyncMiddleware = require('../../common/asyncErrorMiddleware');

const BoardRepo = new BoardRepository(memoryDB);
const BoardServ = new BoardService(BoardRepo);

router.route('/').get(
  asyncMiddleware(async (req, res) => {
    const boards = await BoardServ.getAll();

    res.send(boards);
  })
);

router.route('/:id').get(
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const board = await BoardServ.get(id);

    res.send(board);
  })
);

router.route('/').post(
  asyncMiddleware(async (req, res) => {
    const { body: board } = req;
    const createdBoard = await BoardServ.create(mapBoard(board));

    res.send(createdBoard);
  })
);

router.route('/:id').put(
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const { body: board } = req;
    const newBoard = await BoardServ.update(id, board);

    res.send(newBoard);
  })
);

router.route('/:id').delete(
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    await BoardServ.remove(id);

    res.status(200).send();
  })
);

module.exports = router;
