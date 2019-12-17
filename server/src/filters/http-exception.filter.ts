import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Inject } from '@nestjs/common';
import { Response } from 'express';
import { Logger } from 'winston';
import * as requestIp from 'request-ip';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  constructor(@Inject('winston') private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    this.logger.error('Request ERROR', {
      data: {
        exception: exception.message,
        code: exception.getStatus(),
        request: {
          path: request.path,
          method: request.method,
          headers: request.headers,
          params: request.params,
          body: request.body,
          user: request.user,
          ip: requestIp.getClientIp(request),
        },
      },
    });
    response.status(status).json(exception.message);
  }
}
