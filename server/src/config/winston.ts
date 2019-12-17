import * as winston from 'winston';
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    if (value instanceof Error) {
      const error = {};

      // tslint:disable-next-line:no-shadowed-variable
      Object.getOwnPropertyNames(value).forEach(key => {
        error[key] = value[key];
      });

      return error;
    }
    return value;
  };
};

export default {
  exitOnError: false,
  level: 'development' !== process.env.NODE_ENV ? 'info' : 'debug',
  format:
    'development' !== process.env.NODE_ENV
      ? winston.format.json()
      : winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          winston.format.printf(
            info =>
              `[${info.timestamp}] ${info.level}: ${info.message}${info.data ? `\n${JSON.stringify(info.data, getCircularReplacer(), 2)}` : ''}`,
          ),
        ),
  transports: [new winston.transports.Console()],
};
