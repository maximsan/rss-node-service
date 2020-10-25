const { format } = require('winston');
const { printf } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message &&
    message.replace(/-\s/g, '')}`;
});

const timeFormat = () => {
  return new Date().toLocaleString();
};

const stringify = (name, object) => {
  if (Object.keys(object).length) {
    return `${name}: ${JSON.stringify(object)}; `;
  }
  return null;
};

module.exports = {
  customFormat,
  timeFormat,
  stringify
};
