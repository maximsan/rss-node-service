const { toResponse } = require('./board.model');
const { mapBoard } = require('./board.model');

class BoardController {
  constructor({ boardService }) {
    this.boardService = boardService;
  }

  async get(req, res) {
    const boards = await this.boardService.getAll();

    res.send(boards.map(board => toResponse(board)));
  }

  async getById(req, res) {
    const { id } = req.params;

    const board = await this.boardService.get(id);

    res.send(toResponse(board));
  }

  async post(req, res) {
    const { body: board } = req;

    console.log('board', board);
    const createdBoard = await this.boardService.create(mapBoard(board));

    console.log('createdBoard', createdBoard);
    res.send(toResponse(createdBoard));
  }

  async put(req, res) {
    const { id } = req.params;
    const { body: board } = req;

    const newBoard = await this.boardService.update(id, board);

    res.send(toResponse(newBoard));
  }

  async delete(req, res) {
    const { id } = req.params;

    await this.boardService.remove(id);

    res.status(200).send();
  }
}

module.exports = BoardController;
