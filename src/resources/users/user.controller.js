// eslint-disable-next-line node/no-unpublished-require
const { NOT_FOUND, getReasonPhrase } = require('http-status-codes');
const { mapUser } = require('./user.model');
const { toResponse } = require('./user.model');

class UserController {
  constructor({ userService }) {
    this.userService = userService;

    this.get = this.get.bind(this);
    this.getById = this.getById.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
  }

  async get(req, res) {
    const users = await this.userService.getAll();

    return res.send(users.map(toResponse));
  }

  async getById(req, res) {
    const { id } = req.params;
    const user = await this.userService.get(id);

    res.send(toResponse(user));
  }

  async post(req, res) {
    const { body: user } = req;
    const createdUser = await this.userService.create(mapUser(user));

    if (!createdUser) {
      res.status(NOT_FOUND).send(getReasonPhrase(NOT_FOUND));
    }

    res.send(toResponse(createdUser));
  }

  async put(req, res) {
    const { id } = req.params;
    const { body: user } = req;
    const newUser = await this.userService.update(id, user);

    res.send(toResponse(newUser));
  }

  async delete(req, res) {
    const { id } = req.params;
    await this.userService.remove(id);

    res.status(200).send();
  }
}

module.exports = UserController;
