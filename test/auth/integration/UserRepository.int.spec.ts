import { ConflictException, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import 'dotenv/config';
import { AuthModule } from "src/auth/AuthModule";
import { AuthCredentialDto } from "src/auth/dto/AuthCredentialDto";
import { UserRepository } from "src/auth/UserRepository";
import { typeORMConfig } from "src/config/TypeOrmConfig";

describe('[UserRepository]', () => {
  let app: INestApplication;
  let sut: UserRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        AuthModule,
      ]
    }).compile();

    sut = moduleRef.get<UserRepository>(UserRepository);
    
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await sut.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('사용자 생성',async () => {
    // given
    const authCredentialDto: AuthCredentialDto = new AuthCredentialDto("username", "password");
    
    // when
    await sut.createUser(authCredentialDto);

    // then
    const result = await sut.count();
    expect(result).toBe(1);
  });

  it('사용자명 중복시 오류 발생',async () => {
    // given
    const authCredentialDto: AuthCredentialDto = new AuthCredentialDto("username", "password");
    await sut.createUser(authCredentialDto);
    
    // when
    const result = async () => {
      await sut.createUser(authCredentialDto);
    };

    // then
    await expect(result).rejects.toThrowError(
      new ConflictException('Existing username'),
    );
  });
});