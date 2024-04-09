import { IsString, IsNotEmpty } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginOutput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  access_token: string;
}
