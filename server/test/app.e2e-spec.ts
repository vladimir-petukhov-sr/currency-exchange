import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

describe('Currency Exchange Module (e2e)', () => {
  let app: INestApplication;
  let server;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true, exceptionFactory: errors => new UnprocessableEntityException(errors) }),
    );
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    await app.listen(3000);
    await app.init();

    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/quote (GET)', () => {
    return request(server)
      .get('/api/quote')
      .query({
        from_currency_code: 'EUR',
        to_currency_code: 'USD',
        amount: 100,
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body).toMatchObject({
          exchange_rate: expect.any(Number),
          currency_code: expect.any(String),
          amount: expect.any(Number),
        });
      });
  });

  it('/api/quote (GET) 422', () => {
    return request(server)
      .get('/api/quote')
      .query({
        from_currency_code: 'EUR',
        to_currency_code: 'RUR',
        amount: 100,
      })
      .expect(422)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body).toMatchObject({
          statusCode: expect.any(Number),
          error: expect.any(String),
          message: expect.any(Array),
        });
      });
  });

  it('/api/quote (GET)', () => {
    return request(server)
      .get('/api/classifier/currencies')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body).toMatchObject({
          currencies: expect.any(Array),
        });
      });
  });
});
