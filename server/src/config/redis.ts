export default {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || '',
  keyPrefix: process.env.REDIS_PREFIX || `currency-exchange-${process.env.NODE_ENV}:`,
};
