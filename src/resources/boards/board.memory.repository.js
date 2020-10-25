const { entities } = require('../../db/memoryDB');
const { NotFoundError } = require('../../common/customErrors');

class BoardRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    return this.model.getAll(entities.BOARDS);
  }

  async get(id) {
    const board = await this.model.get(entities.BOARDS, id);

    if (!board) {
      throw new NotFoundError(`The board with id: ${id} was not found`);
    }

    return board;
  }

  async create(board) {
    return this.model.create(entities.BOARDS, board);
  }

  async update(id, board) {
    const newBoard = await this.model.update(entities.BOARDS, id, board);

    if (!newBoard) {
      throw new NotFoundError(`The board with id: ${id} was not found`);
    }

    return newBoard;
  }

  async remove(id) {
    // check if board exist
    await this.get(id);

    const boardTasks = await (await this.model.getAll(entities.TASKS)).filter(
      task => task.boardId === id
    );

    if (boardTasks.length) {
      await Promise.all(
        boardTasks.map(task => {
          return this.model.remove(entities.TASKS, task.id);
        })
      );
    }

    return this.model.remove(entities.BOARDS, id);
  }
}

module.exports = BoardRepository;
