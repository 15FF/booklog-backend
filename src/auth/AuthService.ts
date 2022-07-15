import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialDto } from './dto/AuthCredentialDto';
import { UserRepository } from './UserRepository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async register(authCredentialDto: AuthCredentialDto): Promise<void> {
    await this.userRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      
      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
