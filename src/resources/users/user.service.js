class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return this.repository.getAll();
  }

  async get(id) {
    return this.repository.get(id);
  }

  async create(user) {
    return this.repository.create(user);
  }

  async update(id, user) {
    return this.repository.update(id, user);
  }

  async remove(id) {
    this.repository.remove(id);
  }
}

module.exports = UserService;
