import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../providers/database/postgres/prisma.service';
import { UserService } from './services/user/user.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10s' },
    }),
  ],
  providers: [PrismaService, UserService],
  exports: [PrismaService, UserService],
})
export class SharedModule {}