const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = [
      { title: 'Backlog', order: 1, id: uuid() },
      { title: 'Sprint', order: 2, id: uuid() },
      { title: 'In progress', order: 3, id: uuid() }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

const createBoard = () => {
  return new Board();
};

const mapBoard = ({ title, columns }) => {
  return new Board({ title, columns });
};

module.exports = {
  Board,
  createBoard,
  mapBoard
};
