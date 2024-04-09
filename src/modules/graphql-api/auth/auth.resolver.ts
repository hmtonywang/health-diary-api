import { Request, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Me } from './dto/me.output';
import { LoginOutput } from './dto/login.output';
import { UserService } from '../../../shared/services/user/user.service';
import { UserLoginInput } from './dto/user-login.input';

@Resolver(() => Me)
export class AuthResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => Me)
  async me(@Request() req): Promise<Me> {
    const { user } = req;
    return this.userService.findOneById(user.id);
  }

  @Mutation(() => LoginOutput)
  async login(
    @Args('userLoginInput') userLoginInput: UserLoginInput,
  ): Promise<LoginOutput> {
    return this.userService.login(userLoginInput);
  }
}
