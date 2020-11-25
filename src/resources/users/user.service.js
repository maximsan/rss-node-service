class UserService {
  constructor({ userRepository }) {
    this.repository = userRepository;
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
    return this.repository.remove(id);
  }
}

module.exports = UserService;
