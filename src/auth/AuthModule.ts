import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';
import { TypeOrmExModule } from 'src/db/TypeOrmExModule';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { JwtStrategy } from './JwtStrategy';
import { UserRepository } from './UserRepository';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmExModule.forCustomRepository([UserRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}
