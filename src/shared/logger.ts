import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const { combine, timestamp, label, printf } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${date.toDateString()} ${hour}:${minute}:${second} [${label}] ${level}: ${message}`;
});

const infoLogger = winston.createLogger({
  level: 'info',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'success-info-%DATE%.log'
      ),
      datePattern: 'DD-MM-HH-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

const errorLogger = winston.createLogger({
  level: 'error',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'error-%DATE%.log'
      ),
      datePattern: 'DD-MM-HH-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { infoLogger, errorLogger };
