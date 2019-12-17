import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as requestIp from 'request-ip';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const swaggerPath = '/swagger/';
  const app = await NestFactory.create(AppModule, process.env.NODE_ENV && 'development' !== process.env.NODE_ENV ? { logger: console } : {});
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(compression());
  app.use(helmet());
  app.use(requestIp.mw());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: errors => new UnprocessableEntityException(errors),
    }),
  );
  const options = new DocumentBuilder()
    .setTitle('Currency Exchange API')
    .setVersion('1.0')
    .setSchemes(process.env.NODE_ENV !== 'development' ? 'https' : 'http')
    .setHost(process.env?.API_URL?.replace(/^https?:\/\//gi, '') || '')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerPath, app, document);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
