import { ApiModelProperty } from '@nestjs/swagger';

export class CurrenciesListResponseDto {
    @ApiModelProperty({
    example: ['USD', 'EUR'],
    isArray: true,
    type: String,
    description: 'List of currencies alpha-3 codes',
  })
  currencies: string[];
}
