import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookRepository } from "src/book/BookRepository";
import { typeORMConfig } from "src/config/TypeOrmConfig";
import { ReviewModule } from "src/review/ReviewModule";
import { ReviewRepository } from "src/review/ReviewRepository";
import * as request from 'supertest';

describe('ReviewController (e2e)', () => {
  let app: INestApplication;
  let reviewRepository: ReviewRepository;
  let bookRepository: BookRepository;

  const reviewData = {
    "bookTitle": "greeng00se 장편선",
    "bookImage": "https:\/\/fake.example.com\/asdf\/123\/456\/12345678.jpg?type=m1&udate=amavvdko",
    "bookAuthor": "qilip",
    "bookPublisher": "곤운",
    "bookPubdate": "2016-01-01",
    "bookIsbn": "9791141844829",
    "title": "qilip의 greeng00se 사냥기 100.0",
    "user": "qilip",
    "rating": 9,
    "status": true,
    "description": "독서록 내용"
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        ReviewModule
      ]
    }).compile();
    reviewRepository = moduleRef.get<ReviewRepository>(ReviewRepository);
    bookRepository = moduleRef.get<BookRepository>(BookRepository);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await reviewRepository.delete({});
    await bookRepository.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  it("/POST /review에 review 등록시 201 Created와 review 내용 반환", async () => {
    const response = await request(app.getHttpServer())
      .post("/review")
      .send(reviewData)
      .expect(201);
    expect(response.body.book.title).toStrictEqual(reviewData.bookTitle);
    expect(response.body.title).toStrictEqual(reviewData.title);
    expect(response.body.description).toStrictEqual(reviewData.description);
  });
});
