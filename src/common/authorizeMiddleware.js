// eslint-disable-next-line node/no-unpublished-require
const { UNAUTHORIZED, getReasonPhrase } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const AUTH_WHITE_LIST = ['/docs', '/', '/login'];

const authorizeMiddleware = (req, res, next) => {
  if (AUTH_WHITE_LIST.includes(req.path)) {
    return next();
  }

  const bearerToken = req.header('Authorization');

  if (bearerToken) {
    const [schema, token] = bearerToken.split(' ');

    // const {
    //   payload: { userId, login, secret }
    // } = jwt.decode(strToken);

    if (schema !== 'Bearer') {
      res.status(UNAUTHORIZED).send(getReasonPhrase(UNAUTHORIZED));
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      res.status(UNAUTHORIZED).send(getReasonPhrase(UNAUTHORIZED));
    }

    return next();
  }

  res.status(UNAUTHORIZED).send(getReasonPhrase(UNAUTHORIZED));
};

module.exports = {
  authorizeMiddleware
};
