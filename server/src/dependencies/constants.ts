import { Injectable } from '@nestjs/common';

@Injectable()
export class Constants {
  // Default currencies that can be applied
  // Needed for first initialization
  // After that we\'ll store in redis
  public readonly DEFAULT_CURRENCIES: string[] = (process => {
    try {
      return JSON.parse(process.env.DEFAULT_CURRENCIES).map(currency => currency.toString().toUpperCase());
    } catch (err) {
      return null;
    }
  })(process) || ['EUR', 'USD', 'ILS'];

  public readonly REDIS_KEYS = {
    CURRENCIES_LIST: 'currencies-list',
    CURRENCIES_RATES: 'currencies-rates',
  };

  public readonly EXPIRE_IN_SECONDS_FOR_RATE = 10;

  public readonly EXCHANGES_RATES_API = {
    baseURL: 'https://api.exchangeratesapi.io/',
    methods: {
      latest: {
        path: 'latest',
      },
    },
  };
}
