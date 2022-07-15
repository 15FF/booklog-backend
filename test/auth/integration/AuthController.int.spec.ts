import { INestApplication, UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import 'dotenv/config';
import { AuthController } from "src/auth/AuthController";
import { AuthModule } from "src/auth/AuthModule";
import { AuthCredentialDto } from "src/auth/dto/AuthCredentialDto";
import { UserRepository } from "src/auth/UserRepository";
import { typeORMConfig } from "src/config/TypeOrmConfig";

describe('[AuthController]', () => {

  let app: INestApplication;
  let userRepository: UserRepository;
  let sut: AuthController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        AuthModule,
      ]
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
    sut = moduleRef.get<AuthController>(AuthController);
    
    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await userRepository.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('회원 가입', async () => {
    // given
    const authCredentialDto: AuthCredentialDto = new AuthCredentialDto("username", "password");

    // when
    await sut.register(authCredentialDto);

    // then
    const result = await userRepository.count();
    expect(result).toBe(1);
  });

  it('로그인 성공시 토큰을 반환한다.', async () => {
    // given
    const authCredentialDto: AuthCredentialDto = new AuthCredentialDto("username", "password");
    await userRepository.createUser(authCredentialDto);

    // when
    const token = await sut.signIn(authCredentialDto);

    // then
    expect(token.accessToken).toBeDefined();
  });

  it('로그인 실패시 UnauthorizedException를 던진다.', async () => {
    // given
    const authCredentialDto: AuthCredentialDto = new AuthCredentialDto("username", "password");

    // when
    const result = async () => {
      await sut.signIn(authCredentialDto);
    };

    // then
    await expect(result).rejects.toThrowError(
      new UnauthorizedException('login failed'),
    );
  });
});