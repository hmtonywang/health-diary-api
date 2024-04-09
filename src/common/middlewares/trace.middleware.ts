import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RequestInterface, ResponseInterface } from '../interfaces';

@Injectable()
export class TraceMiddleware implements NestMiddleware {
  use(req: RequestInterface, res: ResponseInterface, next: NextFunction) {
    const traceId: string = uuidv4();
    req.traceId = traceId;
    res.traceId = traceId;
    next();
  }
}
