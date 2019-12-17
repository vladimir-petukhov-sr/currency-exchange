import { Module } from '@nestjs/common';
import { CurrencyExchangeModule } from './modules/currency-exchange/currency-exchange.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Constants } from './dependencies/constants';
import { WinstonModule } from 'nest-winston';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TerminusModule } from '@nestjs/terminus';
import { TerminusOptionsService } from './terminus-options.service';
import { NotFoundInterceptor } from './interceptors/not-found.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { RedisModule } from 'nestjs-redis';
import * as path from 'path';

@Module({
  imports: [
    CurrencyExchangeModule,
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
    WinstonModule.forRootAsync({
      useFactory: async (configService: ConfigService) => configService.get('winston'),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('redis'),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: NotFoundInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    Constants,
  ],
})
export class AppModule {}
