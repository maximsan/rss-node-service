const router = require('express').Router();
const LoginService = require('./login.service');
const asyncMiddleware = require('../../common/asyncErrorMiddleware');
const UserRepository = require('../users/user.db.repository');
const { User } = require('../users/user.model');
// eslint-disable-next-line node/no-unpublished-require
const { OK, UNAUTHORIZED, getReasonPhrase } = require('http-status-codes');

const UserRepo = new UserRepository(User);
const LoginServ = new LoginService(UserRepo);

router.post(
  '/',
  asyncMiddleware(async (req, res) => {
    const { login, password } = req.body;

    const bearerToken = await LoginServ.createJwtToken({ login, password });

    if (!bearerToken) {
      res.status(UNAUTHORIZED).send(getReasonPhrase(UNAUTHORIZED));
    }

    res.status(OK).send({ token: bearerToken });
  })
);

module.exports = router;
