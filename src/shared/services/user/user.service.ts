import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { User } from '../../generated/prisma-nestjs-graphql/user/user.model';
import { User } from '@prisma/client';
import { PrismaService } from '../../../providers/database/postgres/prisma.service';
import { UserCreateInputDto } from './dto/user-create.input.dto';
import { UserLoginInputDto } from './dto/user-login.input.dto';
import { UserTokenOutputDto } from './dto/user-token.output.dto';
import { hashPassword, createSalt } from '../../../utils/password';

@Injectable()
export class UserService {
  private readonly excludeFields = ['password', 'salt', 'verifyToken'];
  private readonly selectFields = {
    id: true,
    email: true,
    isVerified: true,
    createdAt: true,
    updatedAt: true,
  };
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async find(): Promise<User[]> {
    return this.prismaService.user.findMany({
      where: {},
      // select: this.prismaService.$exclude('user', this.excludeFields),
    });
  }

  async findOneById(id: string): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
      // select: this.prismaService.$exclude('user', this.excludeFields),
    });
  }

  async create(userCreateInput: UserCreateInputDto): Promise<User> {
    const { email, password, confirmedPassword } = userCreateInput;
    if (!email || !password || !confirmedPassword) {
      throw new BadRequestException('Missing required fields');
    }
    if (password !== confirmedPassword) {
      throw new BadRequestException('Missing required fields');
    }

    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        throw new ConflictException('User already exists');
      }

      const salt = createSalt();
      const hashedPassword = await hashPassword(password, salt);
      return this.prismaService.user.create({
        data: {
          email,
          password: hashedPassword,
          salt,
        },
        // select: this.prismaService.$exclude('user', this.excludeFields),
      });
    } catch (error) {
      throw error;
    }
  }

  async login(userLoginInput: UserLoginInputDto): Promise<UserTokenOutputDto> {
    const { email, password } = userLoginInput;
    if (!email || !password) {
      throw new BadRequestException('Missing required fields');
    }

    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          password: true,
          salt: true,
        },
      });
      if (!user) {
        throw new UnauthorizedException();
      }

      const hashedPassword = await hashPassword(password, user.salt);
      if (hashedPassword !== user.password) {
        throw new UnauthorizedException();
      }
      const payload = {
        sub: user.id,
        email: user.email,
      };
      const accessToken = await this.jwtService.signAsync(payload);

      return {
        access_token: accessToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
