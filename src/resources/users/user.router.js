const router = require('express').Router();
const { User } = require('./user.model');
const usersService = require('./user.service');
const { mapUser } = require('./user.model');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  // map user fields to exclude secret fields like "password"
  res.send(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.get(id);

  res.send(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const { body: user } = req;
  const createdUser = await usersService.create(mapUser(user));

  res.send(User.toResponse(createdUser));
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { body: user } = req;
  const newUser = await usersService.update(id, user);

  res.send(User.toResponse(newUser));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  await usersService.remove(id);

  res.status(200).send();
});

module.exports = router;
