import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class QuoteResponseDto {
  @ApiModelProperty({
    example: 1.234,
    type: Number,
    description: 'The offered exchange rate',
    required: true,
  })
  @Transform(value => +value.toFixed(3))
  // tslint:disable-next-line:variable-name
  readonly exchange_rate: number;

  @ApiModelProperty({
    example: 'EUR',
    type: String,
    description: 'Currency alpha-3 code',
    required: true,
    minLength: 3,
    maxLength: 3,
  })
  // tslint:disable-next-line:variable-name
  readonly currency_code: string;

  @ApiModelProperty({
    example: 1234,
    type: Number,
    description: 'The expected amount in cents',
    required: true,
    minimum: 1,
    maximum: 1000000000 * 100, // one billion is max amount to exchange
  })
  @Transform(value => +value.toFixed(2))
  // tslint:disable-next-line:variable-name
  readonly amount: number;

  constructor(partial: Partial<QuoteResponseDto>) {
    Object.assign(this, partial);
  }
}
