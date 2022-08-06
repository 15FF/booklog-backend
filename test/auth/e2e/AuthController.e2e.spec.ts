import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { AuthController } from 'src/auth/AuthController';
import { AuthModule } from 'src/auth/AuthModule';
import { AuthCredentialDto } from 'src/auth/dto/AuthCredentialDto';
import { UserRepository } from 'src/auth/UserRepository';
import { typeORMConfig } from 'src/config/TypeOrmConfig';
import * as request from 'supertest';

describe('[AuthController (e2e)]', () => {
  let app: INestApplication;
  let userRepository: UserRepository;
  let sut: AuthController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await userRepository.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('회원가입 성공', async () => {
    // given
    const requestData = { username: 'username', password: 'password' };

    // expect
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(requestData)
      .expect(201);

    const result = await userRepository.count();
    expect(result).toBe(1);
  });

  it('로그인 성공', async () => {
    // given
    const authCredentialDto: AuthCredentialDto = new AuthCredentialDto(
      'username',
      'password',
    );
    await userRepository.createUser(authCredentialDto);

    const requestData = { username: 'username', password: 'password' };

    // expect
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(requestData)
      .expect(201);

    expect(response.body.accessToken).toBeDefined();
    expect(response.body.username).toBeDefined();
  });

  it('로그인 실패', async () => {
    // given
    const requestData = { username: 'username', password: 'password' };

    // expect
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(requestData)
      .expect(401);
  });
});
