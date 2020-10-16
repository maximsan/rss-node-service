const router = require('express').Router();
const { User } = require('./user.model');
const UserService = require('./user.service');
const { mapUser } = require('./user.model');
const memoryDB = require('../../common/memoryDB');
const UserRepository = require('./user.memory.repository');
const UserRepo = new UserRepository(memoryDB);
const UserServ = new UserService(UserRepo);

router.route('/').get(async (req, res) => {
  const users = await UserServ.getAll();

  // map user fields to exclude secret fields like "password"
  res.send(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await UserServ.get(id);

  res.send(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const { body: user } = req;
  const createdUser = await UserServ.create(mapUser(user));

  res.send(User.toResponse(createdUser));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { body: user } = req;
  const newUser = await UserServ.update(id, user);

  res.send(User.toResponse(newUser));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  try {
    await UserServ.remove(id);
    res.status(200).send();
  } catch {
    res.status(404).send('Not found');
  }
});

module.exports = router;
