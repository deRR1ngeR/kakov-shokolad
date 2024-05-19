import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtGuard } from './guard/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthRepository } from './auth.repository';
import { JwtTokensService } from './common/jwt.tokens.service';
import { PrismaModule } from '@app/db';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule,
    JwtModule.register({}),
    PrismaModule,
  ],
  providers: [
    AuthService,
    AuthRepository,
    JwtStrategy,
    JwtTokensService,
    JwtGuard,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
