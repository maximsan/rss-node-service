const router = require('express').Router();
const UserService = require('./user.service');
const { mapUser } = require('./user.model');
const { User, toResponse } = require('./user.model');
const UserRepository = require('./user.db.repository');
const asyncMiddleware = require('../../common/asyncErrorMiddleware');
const { Task } = require('../tasks/task.model');

const UserRepo = new UserRepository(User, Task);
const UserServ = new UserService(UserRepo);

router.route('/').get(
  asyncMiddleware(async (req, res) => {
    const users = await UserServ.getAll();

    res.send(users.map(toResponse));
  })
);

router.route('/:id').get(
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const user = await UserServ.get(id);

    res.send(toResponse(user));
  })
);

router.route('/').post(
  asyncMiddleware(async (req, res) => {
    const { body: user } = req;
    const createdUser = await UserServ.create(mapUser(user));

    res.send(toResponse(createdUser));
  })
);

router.route('/:id').put(
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const { body: user } = req;
    const newUser = await UserServ.update(id, user);

    res.send(toResponse(newUser));
  })
);

router.route('/:id').delete(
  asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    await UserServ.remove(id);

    res.status(200).send();
  })
);

module.exports = router;
