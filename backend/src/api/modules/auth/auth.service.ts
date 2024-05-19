import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthRepository } from './auth.repository';
import { ROUND_OF_SALT } from '@app/constants/auth';
import { JwtTokensService } from './common/jwt.tokens.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/user-registration.dto';
import { Token } from './types/token';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwtTokenService: JwtTokensService,
  ) {}

  public async register(dto: RegisterDto): Promise<Token> {
    const findUser = await this.repository.foundUser(dto);

    if (findUser) {
      throw new BadRequestException(
        'User with this login/email is already exist',
      );
    }

    const hashedPassword = await this.hashData(dto.password);

    const newUser = await this.repository.createNewUser(dto, hashedPassword);

    const tokens = await this.jwtTokenService.signTokens(
      newUser.id,
      newUser.email,
    );
    return tokens;
  }

  public async login(dto: LoginDto): Promise<Token> {
    const user = await this.repository.foundUser(dto);

    if (!user) {
      throw new NotFoundException('User is not exist!');
    } else if (user.isBlocked) {
      throw new UnauthorizedException('Access denied! User is blocked!');
    }
    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Access denied! Incorrect password!');
    }
    const tokens = await this.jwtTokenService.signTokens(user.id, user.email);
    return tokens;
  }

  public async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, ROUND_OF_SALT);
  }
}
