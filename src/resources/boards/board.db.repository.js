const { NotFoundError } = require('../../common/customErrors');

class BoardRepository {
  constructor(model, taskModel) {
    this.model = model;
    this.taskModel = taskModel;
  }

  async getAll() {
    return this.model.find();
  }

  async get(id) {
    const board = await this.model.findById(id);

    if (!board) {
      throw new NotFoundError(`The board with id: ${id} was not found`);
    }

    return board;
  }

  async create(board) {
    return this.model.create(board);
  }

  async update(id, board) {
    const updatedBoard = await this.model.findByIdAndUpdate(id, board, {
      new: true
    });

    if (!updatedBoard) {
      throw new NotFoundError(`The board with id: ${id} was not found`);
    }

    return updatedBoard;
  }

  async remove(id) {
    // check if board exist
    await this.get(id);

    const boardTasks = await this.taskModel.find({ boardId: id });

    if (boardTasks.length) {
      await Promise.all(
        boardTasks.map(task => {
          return this.taskModel.deleteOne({ _id: task.id });
        })
      );
    }

    return this.model.deleteOne({ _id: id });
  }
}

module.exports = BoardRepository;
