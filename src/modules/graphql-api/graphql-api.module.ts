import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { AuthResolver } from './auth/auth.resolver';
import { UserResolver } from './user/user.resolver';
@Module({
  imports: [SharedModule],
  providers: [AuthResolver, UserResolver],
  exports: [],
})
export class GraphqlApiModule {}
