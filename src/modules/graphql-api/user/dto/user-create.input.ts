import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserCreateInput {
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String, { nullable: false, description: 'email of the user' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false, description: 'password of the user' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, {
    nullable: false,
    description: 'confirmed password of the user',
  })
  confirmedPassword: string;
}
