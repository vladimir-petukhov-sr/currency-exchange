import { BadRequestException, ClassSerializerInterceptor, Controller, Get, Inject, Query, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiUnprocessableEntityResponse, ApiUseTags } from '@nestjs/swagger';
import { Logger } from 'winston';
import { CurrencyExchangeService } from './currency-exchange.service';
import { QuoteResponseDto } from './dto/quote-response.dto';
import { QuoteDto } from './dto/quote.dto';
import { CurrenciesListResponseDto } from './dto/currencies-list-response.dto';

@ApiUseTags('Currency exchange module')
@ApiBadRequestResponse({
  description: 'Incorrect request',
})
@ApiUnprocessableEntityResponse({
  description: 'Validation error',
})
@Controller('')
@UseInterceptors(ClassSerializerInterceptor)
export class CurrencyExchangeController {
  constructor(@Inject('winston') private readonly logger: Logger, private readonly currencyExchangeService: CurrencyExchangeService) {}

  @ApiOperation({
    title: 'Get a quote for exchanging money from one currency to another',
  })
  @ApiOkResponse({
    type: QuoteResponseDto,
  })
  @Get('quote')
  public async getQuote(@Query() quoteDto: QuoteDto): Promise<QuoteResponseDto> {
    this.logger.info('User wants to get quote', { data: { quoteDto } });
    try {
      return this.currencyExchangeService.getQuote(quoteDto);
    } catch (err) {
      this.logger.error('Error due getting quote', { data: { quote: quoteDto, err } });
      throw new BadRequestException('Error due getting quote');
    }
  }

  @ApiOperation({
    title: 'Get currencies classifier. Available currencies to use in system.',
  })
  @ApiOkResponse({
    type: CurrenciesListResponseDto,
  })
  @Get('classifier/currencies')
  public async getQuoteClassifier(): Promise<CurrenciesListResponseDto> {
    this.logger.info('User wants to get currencies classifier');
    try {
      return { currencies: await this.currencyExchangeService.getAllAvailableCurrencies() };
    } catch (err) {
      this.logger.error('Error due getting currencies classifier', { data: { err } });
      throw new BadRequestException('Error due getting currencies classifier');
    }
  }
}
