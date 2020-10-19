const { entities } = require('../../common/memoryDB');
const { NotFoundError } = require('../../common/customErrors');

class UserRepository {
  constructor(userModel) {
    this.model = userModel;
  }

  async getAll() {
    return this.model.getAll(entities.USERS);
  }

  async get(id) {
    const user = await this.model.get(entities.USERS, id);

    if (!user) {
      throw new NotFoundError(`User with id: ${id} was not found`);
    }

    return user;
  }

  async create(user) {
    return this.model.create(entities.USERS, user);
  }

  async update(id, user) {
    const newUser = await this.model.update(entities.USERS, id, user);

    if (!newUser) {
      throw new NotFoundError(`User with id: ${id} was not found`);
    }

    return newUser;
  }

  async remove(id) {
    // check if user exit
    await this.get(id);

    const userTasks = (await this.model.getAll(entities.TASKS)).filter(
      ({ userId }) => id === userId
    );

    if (userTasks.length) {
      await Promise.all(
        userTasks.map(task => {
          return this.model.update(entities.TASKS, task.id, {
            ...task,
            userId: null
          });
        })
      );
    }

    return this.model.remove(entities.USERS, id);
  }
}

// Promise.reject(Error('Oops!'));

module.exports = UserRepository;
