import { ConflictException, INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import 'dotenv/config';
import { AuthModule } from "src/auth/AuthModule";
import { AuthCredentialDto } from "src/auth/dto/AuthCredentialDto";
import { UserRepository } from "src/auth/UserRepository";
import { typeORMConfig } from "src/config/TypeOrmConfig";

describe('[UserRepository]', () => {
  let app: INestApplication;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        AuthModule,
      ]
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
    
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true }
    ));
    await app.init();
  });

  afterEach(async () => {
    await userRepository.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('사용자 생성',async () => {
    // given
    const authCredentialDto: AuthCredentialDto = new AuthCredentialDto("username", "password");
    
    // when
    await userRepository.createUser(authCredentialDto);

    // then
    const count = await userRepository.count();
    expect(count).toBe(1);
  })

  it('사용자명 중복시 오류 발생',async () => {
    // given
    const authCredentialDto: AuthCredentialDto = new AuthCredentialDto("username", "password");
    await userRepository.createUser(authCredentialDto);
    
    // when
    const sut = async () => {
      await userRepository.createUser(authCredentialDto);
    };

    // then
    await expect(sut).rejects.toThrowError(
      new ConflictException('Existing username'),
    );
  })
});