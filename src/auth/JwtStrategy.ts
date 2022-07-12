import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserInfoDto } from "./dto/UserInfoDto";
import { UserRepository } from "./UserRepository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload) {
    const { username } = payload;
    const userInfo: UserInfoDto = await this.userRepository.findByUserName( username );
    
    if (!userInfo) {
      throw new UnauthorizedException();
    }

    return userInfo;
  }
}