import { BadRequestException, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import 'dotenv/config';
import { BooksModule } from "src/book/BookModule";
import { BookRepository } from "src/book/BookRepository";
import { BookSearchService } from 'src/book/BookSearchService';
import * as request from 'supertest';
import { instance, mock, when } from "ts-mockito";

describe('BookController (e2e)', () => {
  let app: INestApplication;

  const naverSearchApiResult: any = {
    "total": 1,
    "start": 1,
    "display": 1,
    "items": [
      {
        "title": "<b>큐피와 그린구스<\/b>의 모험",
        "image": "https:\/\/fake.example.com\/asdf\/123\/456\/12345678.jpg?type=m1&udate=amavvdko",
        "author": "<b>greeng00se<\/b>",
        "price": "100000000",
        "discount": "9000000",
        "publisher": "곤운인쇄소",
        "pubdate": "2010",
        "isbn": "1234567890 9791141844822",
      },
    ],
  };

  beforeAll(async () => {
    const mockSearchService: BookSearchService = mock(BookSearchService);
    const mockRepository: BookRepository = mock(BookRepository);
    when(mockSearchService.callBookApi('큐피와 그린구스')).thenResolve(naverSearchApiResult);
    when(mockSearchService.callBookApi(`''`)).thenThrow(new BadRequestException(["bookQuery should not be empty"]));
    const moduleRef = await Test.createTestingModule({ imports: [BooksModule] })
      .overrideProvider(BookSearchService).useValue(instance(mockSearchService))
      .overrideProvider(BookRepository).useValue(instance(mockRepository))
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/GET /books?bookQuery='' 요청시 400 Bad Request 반환", async () => {
    const response = await request(app.getHttpServer())
      .get("/books?bookQuery=''")
      .expect(400);
    expect(response.body.message).toStrictEqual(['bookQuery should not be empty']);
    expect(response.body.error).toBe('Bad Request');
  });

  it("/GET /boks?bookQuery=큐피와 그린구스 요청시 책 목록과 200 OK 반환", async () => {

    const response = await request(app.getHttpServer())
      .get("/books?bookQuery="+encodeURI('큐피와 그린구스'))
      .expect(200);
    expect(response.body.items[0].title).toBe('큐피와 그린구스의 모험');
  });
});
