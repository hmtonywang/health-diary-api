import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      playground: process.env.ENV !== 'production',
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
    };
  }
}
