import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { AuthModule } from 'src/auth/AuthModule';
import { UserRepository } from 'src/auth/UserRepository';
import { BookModule } from "src/book/BookModule";
import { BookRepository } from "src/book/BookRepository";
import { BookSearchService } from 'src/book/BookSearchService';
import { typeORMConfig } from 'src/config/TypeOrmConfig';
import * as request from 'supertest';
import { instance, mock, when } from "ts-mockito";

describe('BookController (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;
  let auth = { accessToken: null };

  const naverSearchApiResult: any = {
    "total": 1,
    "start": 1,
    "display": 1,
    "items": [
      {
        "title": "큐피와 그린구스의 모험",
        "image": "https:\/\/fake.example.com\/asdf\/123\/456\/12345678.jpg?type=m1&udate=amavvdko",
        "author": "greeng00se",
        "discount": "9000000",
        "publisher": "곤운인쇄소",
        "pubdate": "2010",
        "isbn": "9791141844822",
      },
    ],
  };

  beforeAll(async () => {
    const mockSearchService: BookSearchService = mock(BookSearchService);
    const mockRepository: BookRepository = mock(BookRepository);
    when(mockSearchService.callBookApi('큐피와 그린구스')).thenResolve(naverSearchApiResult);
    when(mockSearchService.callBookApi(`''`)).thenThrow(new BadRequestException(["bookQuery should not be empty"]));
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        BookModule,
        AuthModule,
      ]
    })
      .overrideProvider(BookSearchService).useValue(instance(mockSearchService))
      .overrideProvider(BookRepository).useValue(instance(mockRepository))
      .compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      transform: true
    }));
    await app.init();

    const user = {
      'username': 'username',
      'password': 'password',
    }
    await userRepository.createUser(user);

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(user)
    auth.accessToken = response.body.accessToken;
  });

  afterAll(async () => {
    await userRepository.delete({});
    await app.close();
  });

  it("/GET /books?bookQuery='' 요청시 400 Bad Request 반환", async () => {
    const response = await request(app.getHttpServer())
      .get("/books?bookQuery=''")
      .auth(auth.accessToken, { type: 'bearer' })
      .expect(400);
    expect(response.body.message).toStrictEqual(['bookQuery should not be empty']);
    expect(response.body.error).toBe('Bad Request');
  });

  it("/GET /boks?bookQuery=큐피와 그린구스 요청시 책 목록과 200 OK 반환", async () => {
    const response = await request(app.getHttpServer())
      .get("/books?bookQuery=" + encodeURI('큐피와 그린구스'))
      .auth(auth.accessToken, { type: 'bearer' })
      .expect(200);
    expect(response.body.items[0].title).toBe('큐피와 그린구스의 모험');
  });
});
