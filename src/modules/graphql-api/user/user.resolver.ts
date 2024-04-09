import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './dto/user.output';
import { UserService } from '../../../shared/services/user/user.service';
import { UserCreateInput } from './dto/user-create.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.find();
  }

  @Query(() => User)
  async user(
    @Args('id')
    id: string,
  ): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('userCreateInput') userCreateInput: UserCreateInput,
  ): Promise<User> {
    return this.userService.create(userCreateInput);
  }
}
