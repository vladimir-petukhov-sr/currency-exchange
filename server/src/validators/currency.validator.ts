import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CurrencyExchangeService } from '../modules/currency-exchange/currency-exchange.service';

@ValidatorConstraint({ name: 'country', async: true })
@Injectable()
export class CurrencyValidator implements ValidatorConstraintInterface {
  constructor(private readonly currencyExchangeService: CurrencyExchangeService) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `"${validationArguments.value}" is not valid ISO 4217 currency code or not provided currency by system!`;
  }

  async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
    try {
      const currenciesList = await this.currencyExchangeService.getAllAvailableCurrencies();
      return !!currenciesList.map(currency => currency.toUpperCase()).find(currency => currency === value);
    } catch (err) {
      return false;
    }
  }
}
