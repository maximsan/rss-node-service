const { NotFoundError } = require('../../common/customErrors');

class UserRepository {
  constructor(userModel, taskModel) {
    this.model = userModel;
    this.taskModel = taskModel;
  }

  async getAll() {
    return this.model.find();
  }

  async get(id) {
    const user = await this.model.findById(id);

    if (!user) {
      throw new NotFoundError(`User with id: ${id} was not found`);
    }

    return user;
  }

  async create(user) {
    return this.model.create(user);
  }

  async update(id, user) {
    const updatedUser = await this.model.findByIdAndUpdate(id, user, {
      new: true
    });

    if (!updatedUser) {
      throw new NotFoundError(`User with id: ${id} was not found`);
    }

    return updatedUser;
  }

  async remove(id) {
    await this.get(id);

    const userTasks = await this.taskModel.find({ userId: id });

    if (userTasks.length) {
      await Promise.all(
        userTasks.map(task => {
          return this.taskModel.findByIdAndUpdate(task.id, { userId: null });
        })
      );
    }

    return this.model.findByIdAndDelete(id);
  }
}

module.exports = UserRepository;
