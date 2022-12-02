import { createLogger, format, transports } from 'winston';
import path from 'path';

const appDir = path
  .dirname(require.main.filename)
  .split('\\')
  .join('\\/');

const formatParams = info => {
  const { name, stack, statusCode, description, timestamp, level, message: rawMessage } = info;
  const ts = timestamp.slice(0, 19).replace('T', ' ');
  const message = rawMessage[0] === '\t' ? rawMessage.substr(1) : rawMessage;

  if (!name) {
    return `${ts} ${level}: ${message}`;
  }
  const reg = new RegExp(`${appDir}(\\S+)`, 'gm');
  const match = reg.exec(stack);
  const location = match ? ` (at "${match[1]}")` : '';

  return `${ts} ${level}: [${statusCode} ${name}]${location}: ${description || message}`;
};

const finalFormat = format.combine(
  format.colorize(),
  format.timestamp({
    format: 'DD-MM-YYYY HH:mm:ss',
  }),
  format.align(),
  format.printf(formatParams),
);

const logger = createLogger({
  level: 'info',
  format: finalFormat,
  transports: [new transports.Console()],
});

export default logger;