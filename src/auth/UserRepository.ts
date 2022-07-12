import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CustomRepository } from "src/db/TypeOrmExDecorator";
import { Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/AuthCredentialDto";
import { UserInfoDto } from './dto/UserInfoDto';
import { User } from "./User.entity";

@CustomRepository(User)
export class UserRepository extends Repository<User> {

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.sqlState == '23000') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findByUserName(username: string): Promise<UserInfoDto> {
    const user: User = await this.findOneBy({ username });
    return new UserInfoDto(user.id, user.username);
  }
}