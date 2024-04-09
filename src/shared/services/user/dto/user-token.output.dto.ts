import { IsString, IsNotEmpty } from 'class-validator';

export class UserTokenOutputDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
