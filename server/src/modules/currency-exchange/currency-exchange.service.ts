import { HttpService, Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { Constants } from '../../dependencies/constants';
import { RedisService } from 'nestjs-redis';
import { QuoteDto } from './dto/quote.dto';
import { QuoteResponseDto } from './dto/quote-response.dto';
import RatesInterface from './interfaces/rates.interface';

@Injectable()
export class CurrencyExchangeService {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    private readonly constants: Constants,
    private readonly redisService: RedisService,
    private readonly httpService: HttpService,
  ) {}

  public async getAllAvailableCurrencies(): Promise<string[]> {
    try {
      const cList = await this.redisService.getClient().get(this.constants.REDIS_KEYS.CURRENCIES_LIST);
      if (!cList || !cList.length) {
        await this.redisService.getClient().set(this.constants.REDIS_KEYS.CURRENCIES_LIST, JSON.stringify(this.constants.DEFAULT_CURRENCIES));
        this.logger.info('Set currencies list to redis', {
          data: { key: this.constants.REDIS_KEYS.CURRENCIES_LIST, list: this.constants.DEFAULT_CURRENCIES },
        });
        return this.constants.DEFAULT_CURRENCIES;
      } else {
        try {
          const cListData = JSON.parse(cList);
          this.logger.info('Got currencies list from redis', { data: { cListData } });
          return cListData;
        } catch (err) {
          this.logger.error('Error due parsing data for currencies list from redis', { data: { cList, err } });
          return this.constants.DEFAULT_CURRENCIES;
        }
      }
    } catch (err) {
      this.logger.error('Error due getting al available currencies', { data: { err } });
      throw new Error(err);
    }
  }

  public async getQuote({ amount, from_currency_code, to_currency_code }: QuoteDto): Promise<QuoteResponseDto> {
    try {
      const rate = await this.getQuoteFromRedis(from_currency_code);
      return new QuoteResponseDto({
        exchange_rate: rate.rates[to_currency_code] || 1,
        currency_code: to_currency_code,
        amount: amount * (rate.rates[to_currency_code] || 1),
      });
    } catch (err) {
      this.logger.error('Error due get quote', { data: { amount, from_currency_code, to_currency_code, err } });
      throw new Error('Error due get quote');
    }
  }

  private async getQuoteFromRedis(base: string): Promise<RatesInterface> {
    try {
      this.logger.info('Try to get quote for base from redis', { data: { base } });
      const res = await this.redisService.getClient().get(`${this.constants.REDIS_KEYS.CURRENCIES_RATES}-${base}`);
      if (!res) {
        this.logger.info('Redis answer is empty', { data: { base } });
        return this.getQuotesViaExternalAPIAndSetIntoRedis(base);
      }
      try {
        return JSON.parse(res);
      } catch (err) {
        this.logger.error('Error due parsing data from redis', { data: { base, res, err } });
        return this.getQuotesViaExternalAPIAndSetIntoRedis(base);
      }
    } catch (err) {
      this.logger.error('Error due getting quotes from redis', {
        data: { base, key: this.constants.REDIS_KEYS.CURRENCIES_RATES, err },
      });
      throw new Error('Error due getting quotes from from redis');
    }
  }

  private async getQuotesViaExternalAPIAndSetIntoRedis(base: string): Promise<RatesInterface> {
    try {
      this.logger.info('Try to get quotes from external resource', { data: { base } });
      const { data } = await this.httpService
        .get<RatesInterface>(this.constants.EXCHANGES_RATES_API.methods.latest.path, {
          baseURL: this.constants.EXCHANGES_RATES_API.baseURL,
          params: {
            base,
          },
        })
        .toPromise();
      await this.redisService
        .getClient()
        .set(`${this.constants.REDIS_KEYS.CURRENCIES_RATES}-${base}`, JSON.stringify(data), 'EX', this.constants.EXPIRE_IN_SECONDS_FOR_RATE);
      return data;
    } catch (err) {
      this.logger.error('Error due getting quotes from external resource', {
        data: { base, path: this.constants.EXCHANGES_RATES_API.methods.latest.path, baseUrl: this.constants.EXCHANGES_RATES_API.baseURL, err },
      });
      throw new Error('Error due getting quotes from external resource');
    }
  }
}
