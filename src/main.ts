import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

const logger = new Logger('main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add security
  app.use(helmet());
  // Add compression
  app.use(compression());
  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  process.on('uncaughtException', (error: Error) => {
    logger.error(error.name, error.message, error.stack);
  });

  await app.listen(process.env.PORT || 3000);
  logger.log(`Server is running on: ${await app.getUrl()}`);
}
bootstrap().catch((error: Error) => {
  logger.error('Running server error', error.name, error.message, error.stack);
  process.exit(1);
});
