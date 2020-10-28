const mongoose = require('mongoose');

const createBoard = () => {
  return new Board();
};

const mapBoard = ({ title, columns }) => {
  return new Board({ title, columns });
};

const columnSchema = new mongoose.Schema({
  _id: {
    type: mongoose.ObjectId,
    default: mongoose.Types.ObjectId()
  },
  title: String,
  order: Number
});

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [columnSchema]
  },
  { collection: 'boards' }
);

const Column = mongoose.model('columns', columnSchema);

const Board = mongoose.model('boards', boardSchema);

const toResponse = ({ id, title, columns }) => {
  return {
    id,
    title,
    // eslint-disable-next-line no-shadow
    columns: columns.map(({ id, title, order }) => ({ id, title, order }))
  };
};

module.exports = {
  Board,
  Column,
  createBoard,
  mapBoard,
  toResponse
};
