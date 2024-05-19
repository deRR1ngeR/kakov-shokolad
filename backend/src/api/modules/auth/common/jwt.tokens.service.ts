import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { Token } from '../types/token';
import { AuthRepository } from '../auth.repository';
import { ROUND_OF_SALT } from '@app/constants/auth';

@Injectable()
export class JwtTokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly repository: AuthRepository,
  ) {}

  public async signToken(userId: number, mail: string): Promise<Token> {
    const [at] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          mail,
        },
        {
          secret: this.configService.get<string>('ATSECRET'),
          expiresIn: this.configService.get<string>('ATEXPIREIN'),
        },
      ),
    ]);

    return {
      accessToken: at,
    };
  }

  public async signTokens(userId: number, mail: string): Promise<Token> {
    return this.signToken(userId, mail);
  }

  public async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, ROUND_OF_SALT);
  }
}
