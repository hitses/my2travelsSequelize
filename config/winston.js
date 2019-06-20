const winston = require('winston');
const morgan = require('morgan');

let fileInfo = {
  level: 'info',
  filename: `./logs/app.log`,
  handleExceptions: true,
  format: winston.format.json(),
  maxsize: 5242880,
  maxFiles: 5,
};

let fileError = {
  level: 'error',
  filename: `./logs/app.log`,
  handleExceptions: true,
  format: winston.format.json(),
  maxsize: 5242880,
  maxFiles: 5,
};

let consola = {
  level: 'info',
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
};

let logger = winston.createLogger({
  transports: [
    new winston.transports.File(fileInfo),
    new winston.transports.File(fileError),
    new winston.transports.Console(consola)
  ],
  exitOnError: false,
});
logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
}
module.exports = morgan('combined', {stream: logger.stream});