const router = require('express').Router();
const BoardService = require('./board.service');
const { mapBoard, Board } = require('./board.model');
const BoardRepository = require('./board.db.repository');
const asyncMiddleware = require('../../common/asyncErrorMiddleware');
const { toResponse } = require('./board.model');
const { Task } = require('../tasks/task.model');

const BoardRepo = new BoardRepository(Board, Task);
const BoardServ = new BoardService(BoardRepo);

router.route('/').get(
  asyncMiddleware(async (req, res) => {
    const boards = await BoardServ.getAll();

    res.send(boards.map(board => toResponse(board)));
  })
);

router.route('/:id').get(
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const board = await BoardServ.get(id);

    res.send(toResponse(board));
  })
);

router.route('/').post(
  asyncMiddleware(async (req, res) => {
    const { body: board } = req;
    const createdBoard = await BoardServ.create(mapBoard(board));

    res.send(toResponse(createdBoard));
  })
);

router.route('/:id').put(
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const { body: board } = req;
    const newBoard = await BoardServ.update(id, board);

    res.send(toResponse(newBoard));
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
