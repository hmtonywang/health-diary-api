import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UserLoginInputDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
