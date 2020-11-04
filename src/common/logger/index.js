const path = require('path');
const { appendFileSync } = require('fs');
const morgan = require('morgan');
const { stringify } = require('./helpers');
const { timeFormat } = require('./helpers');
const { customFormat } = require('./helpers');
const { transports, format, createLogger } = require('winston');
const { combine, timestamp, colorize, label } = format;

const infoLogsFile = path.join(__dirname, '/../../../', 'logs/info.log');
const errorLogsFile = path.join(__dirname, '/../../../', 'logs/errors.log');

const consoleTransport = new transports.Console({
  level: 'info',
  json: false,
  format: combine(
    label({ label: 'level' }),
    timestamp({ format: timeFormat }),
    colorize(),
    customFormat
  ),
  handleExceptions: true
});

const fileTransports = [
  new transports.File({
    level: 'info',
    filename: infoLogsFile,
    json: true,
    colorize: false,
    maxsize: 5242880,
    maxFiles: 2,
    handleExceptions: true,
    format: combine(
      label({ label: 'level' }),
      timestamp({ format: timeFormat }),
      customFormat
    )
  }),
  new transports.File({
    level: 'error',
    filename: errorLogsFile,
    json: true,
    colorize: false,
    maxsize: 5242880,
    maxFiles: 2,
    handleExceptions: true,
    format: combine(
      label({ label: 'level' }),
      timestamp({ format: timeFormat }),
      customFormat
    )
  })
];

const winstonLogger = createLogger({
  transports:
    process.env.NODE_ENV === 'production'
      ? fileTransports
      : [consoleTransport, ...fileTransports],
  exitOnError: false
});

winstonLogger.stream = {
  write: message => {
    winstonLogger.info(message);
  }
};

morgan.token('body', req => {
  const { body } = req;
  return stringify('body', body);
});

morgan.token('query', req => {
  const { query } = req;
  return stringify('query', query);
});

morgan.token('params', req => {
  const { params } = req;
  return stringify('params', params);
});

const morganLogger = morgan(
  ':method :url :body :params :query HTTP/:http-version :status :referrer :user-agent',
  { stream: winstonLogger.stream }
);

const logError = (error, originalUrl, method) => {
  winstonLogger.error(
    `${method} - ${error.message} - ${error.status || 500} - ${originalUrl} - ${
      error.stack
    }`
  );
};

const logErrorSync = message => {
  winstonLogger.error(message);

  appendFileSync(errorLogsFile, message);
};

module.exports = {
  morganLogger,
  winstonLogger,
  logError,
  logErrorSync,
  errorLogsFile
};
