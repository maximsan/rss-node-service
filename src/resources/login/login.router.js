const router = require('express').Router();
const asyncMiddleware = require('../../common/asyncErrorMiddleware');
const { container } = require('../../di/DISetup');
// eslint-disable-next-line node/no-unpublished-require
const { OK, UNAUTHORIZED, getReasonPhrase } = require('http-status-codes');

router.post(
  '/',
  asyncMiddleware(async (req, res) => {
    const { name, login, password } = req.body;
    const loginService = container.resolve('loginService');

    // req.scope = container.createScope();

    const bearerToken = await loginService.createJwtToken({
      name,
      login,
      password
    });

    if (!bearerToken) {
      res.status(UNAUTHORIZED).send(getReasonPhrase(UNAUTHORIZED));
    }

    res.status(OK).send({ token: bearerToken });
  })
);

module.exports = router;
