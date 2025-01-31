import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UserCreateInputDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmedPassword: string;
}
