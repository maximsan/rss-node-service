const path = require('path');
const morgan = require('morgan');
const { transports, format, createLogger } = require('winston');
const { combine, timestamp, colorize, label, printf } = format;

console.log('__dirname', __dirname);

const infoLogsFile = path.join(__dirname, '/../../', 'logs/info.log');

const timeFormat = () => {
  return new Date().toLocaleString();
};

// eslint-disable-next-line no-shadow
const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message.replace(/-\s/g, '')}`;
});

const winstonLogger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      json: false,
      format: combine(
        label({ label: 'level' }),
        timestamp({ format: timeFormat }),
        colorize(),
        customFormat
      ),
      handleExceptions: true
    }),
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
    })
  ],
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

const stringify = (name, object) => {
  if (Object.keys(object).length) {
    return `${name}: ${JSON.stringify(object)}; `;
  }
  return null;
};

const morganLogger = morgan(
  ':method :url :body :params :query HTTP/:http-version :status :referrer :user-agent',
  { stream: winstonLogger.stream }
);

module.exports = {
  morganLogger,
  winstonLogger
};
