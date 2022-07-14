import { INestApplication, UnauthorizedException, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import 'dotenv/config';
import { AuthModule } from "src/auth/AuthModule";
import { AuthCredentialDto } from "src/auth/dto/AuthCredentialDto";
import { JwtStrategy } from "src/auth/JwtStrategy";
import { UserRepository } from "src/auth/UserRepository";
import { typeORMConfig } from "src/config/TypeOrmConfig";

describe('[JwtStrategy]', () => {

  let app: INestApplication;
  let userRepository: UserRepository;
  let sut: JwtStrategy;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        AuthModule,
      ]
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
    sut = moduleRef.get<JwtStrategy>(JwtStrategy);
    
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true }
    ))
    await app.init();
  });

  afterEach(async () => {
    await userRepository.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('사용자가 존재하는 경우 해당 사용자에 대한 정보를 반환한다.',async () => {
    // given
    const username: string = "username";
    const password: string = "password";
    const authCredentialDto: AuthCredentialDto = new AuthCredentialDto(username, password);
    await userRepository.createUser(authCredentialDto);
    const payload = { username };

    // when
    const result = await sut.validate(payload);

    // then
    expect(result).toBeDefined();
    expect(result.username).toBe(username);
    expect(result.id).toBeDefined();
  })

  it('사용자가 존재하지 않는 경우 UnauthorizedException를 던진다.',async () => {
    // given
    const username = "Foo";
    const payload = { username };

    // when
    const result = async () => {
      await sut.validate(payload);
    };

    // then
    await expect(result).rejects.toThrowError(
      new UnauthorizedException(),
    );
  })
});