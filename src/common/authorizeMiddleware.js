// eslint-disable-next-line node/no-unpublished-require
const { UNAUTHORIZED, getReasonPhrase } = require('http-status-codes');
const { logError } = require('./logger');
const jwt = require('jsonwebtoken');

const AUTH_WHITE_LIST = ['/doc', '/', '/login'];

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
      logError('wrong token schema', res.originalUrl, req.method);
      res.status(UNAUTHORIZED).send(getReasonPhrase(UNAUTHORIZED));
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      logError(error, res.originalUrl, req.method);
      res.status(UNAUTHORIZED).send(getReasonPhrase(UNAUTHORIZED));
    }

    return next();
  }

  logError('token is not exist', res.originalUrl, req.method);
  res.status(UNAUTHORIZED).send(getReasonPhrase(UNAUTHORIZED));
};

module.exports = {
  authorizeMiddleware
};
