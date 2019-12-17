import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsNotEmpty, IsNumber, IsString, Length, Max, Min, Validate } from 'class-validator';
import { CurrencyValidator } from '../../../validators/currency.validator';
import { Transform } from 'class-transformer';

export class QuoteDto {
  @ApiModelProperty({
    example: 'USD',
    type: String,
    description: 'Currency alpha-3 code',
    required: true,
    minLength: 3,
    maxLength: 3,
  })
  @Transform(value => value.toUpperCase())
  @Validate(CurrencyValidator)
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @Length(3, 3)
  // tslint:disable-next-line:variable-name
  readonly from_currency_code: string;

  @ApiModelProperty({
    example: 134,
    type: Number,
    description: 'The amount to convert in cents',
    required: true,
    minimum: 1,
    maximum: 1000000000 * 100, // one billion is max amount to exchange
  })
  @Transform(value => (isNaN(+value) ? 0 : +value))
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  @IsInt()
  @Min(1)
  @Max(1000000000 * 100)
  readonly amount: number;

  @ApiModelProperty({
    example: 'EUR',
    type: String,
    description: 'Currency alpha-3 code',
    required: true,
    minLength: 3,
    maxLength: 3,
  })
  @Transform(value => value.toUpperCase())
  @Validate(CurrencyValidator)
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @Length(3, 3)
  // tslint:disable-next-line:variable-name
  readonly to_currency_code: string;
}
