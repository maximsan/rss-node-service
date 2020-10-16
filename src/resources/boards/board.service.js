class BoardService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async get(id) {
    return await this.repository.get(id);
  }

  async create(board) {
    return await this.repository.create(board);
  }

  async update(id, board) {
    return await this.repository.update(id, board);
  }

  async remove(id) {
    await this.repository.remove(id);
  }
}

module.exports = BoardService;
