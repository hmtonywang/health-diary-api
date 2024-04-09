import { Logger } from '@nestjs/common';
import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { prismaExclude } from 'prisma-exclude';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly logger = new Logger(PrismaService.name);
  public $exclude;

  constructor() {
    super();
    this.$exclude = prismaExclude(this);
  }

  async onModuleInit() {
    this.logger.log('Connecting to database...');
    await this.$connect();
    this.logger.log('Connection to database has been established successfully');
  }

  async onApplicationShutdown(signal: string) {
    this.logger.log(`Receives a termination signal: ${signal}`);
    this.logger.log('Disconnecting from database...');
    await this.$disconnect();
    this.logger.log('Disconnected from database');
  }
}
