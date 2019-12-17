import { HttpModule, Module } from '@nestjs/common';
import { CurrencyExchangeService } from './currency-exchange.service';
import { CurrencyExchangeController } from './currency-exchange.controller';
import { Constants } from '../../dependencies/constants';
import { CurrencyValidator } from '../../validators/currency.validator';

@Module({
  imports: [HttpModule],
  providers: [CurrencyExchangeService, Constants, CurrencyValidator],
  controllers: [CurrencyExchangeController],
})
export class CurrencyExchangeModule {}
