class BoardService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return this.repository.getAll();
  }

  async get(id) {
    return this.repository.get(id);
  }

  async create(board) {
    return this.repository.create(board);
  }

  async update(id, board) {
    return this.repository.update(id, board);
  }

  async remove(id) {
    this.repository.remove(id);
  }
}

module.exports = BoardService;
