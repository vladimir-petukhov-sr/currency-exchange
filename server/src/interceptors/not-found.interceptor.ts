import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from 'winston';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(data => {
        if (undefined === data) {
          const req = context.switchToHttp().getRequest();
          this.logger.error('Undefined result. Sending 404 response', { data: { request: { params: req.params } } });
          throw new NotFoundException();
        }
      }),
    );
  }
}
