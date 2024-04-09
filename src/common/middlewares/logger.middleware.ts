import { Logger } from '@nestjs/common';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { RequestInterface, ResponseInterface } from '../interfaces';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly reqLogger = new Logger('req');
  private readonly resLogger = new Logger('res');

  use(req: RequestInterface, res: ResponseInterface, next: NextFunction) {
    const start = Date.now();
    const {
      ip,
      method,
      originalUrl,
      query,
      body,
      headers,
      protocol,
      httpVersion,
      traceId,
    } = req;
    const logFormat = {
      ip,
      method,
      originalUrl,
      protocol,
      httpVersion,
      headers,
      query,
      body,
      traceId,
    };
    this.reqLogger.log(`${traceId} - ${JSON.stringify(logFormat)}`);
    res.on('finish', () => {
      const duration = Date.now() - start;
      const contentType = res.getHeader('content-type');
      const contentLength = res.getHeader('content-length');
      const { statusCode } = res;
      const resLogFormat = {
        ip,
        method,
        originalUrl,
        protocol,
        httpVersion,
        contentType,
        contentLength,
        statusCode,
        duration,
        traceId,
      };
      this.resLogger.log(`${traceId} - ${JSON.stringify(resLogFormat)}`);
    });
    next();
  }
}
