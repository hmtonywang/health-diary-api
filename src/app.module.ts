import { Module, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GqlConfigService } from './config';
import { GraphqlApiModule } from './modules/graphql-api/graphql-api.module';
import { SharedModule } from './shared/shared.module';
import { TraceMiddleware, LoggerMiddleware } from './common/middlewares';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    GraphqlApiModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceMiddleware, LoggerMiddleware).forRoutes('*');
  }
}
