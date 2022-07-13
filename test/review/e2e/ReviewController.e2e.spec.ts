import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import 'dotenv/config';
import { AuthModule } from "src/auth/AuthModule";
import { UserRepository } from "src/auth/UserRepository";
import { BookRepository } from "src/book/BookRepository";
import { typeORMConfig } from "src/config/TypeOrmConfig";
import { ReviewModule } from "src/review/ReviewModule";
import { ReviewRepository } from "src/review/ReviewRepository";
import * as request from 'supertest';

describe('ReviewController (e2e)', () => {
  let app: INestApplication;
  let reviewRepository: ReviewRepository;
  let bookRepository: BookRepository;
  let userRepository: UserRepository;
  let auth = { accessToken: null };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        ReviewModule,
        AuthModule,
      ]
    }).compile();

    reviewRepository = moduleRef.get<ReviewRepository>(ReviewRepository);
    bookRepository = moduleRef.get<BookRepository>(BookRepository);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      transform: true
    }));
    await app.init();
    
    const user = {
      username: 'greengoose',
      password: 'password1',
    }
    
    await request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(user)
    auth.accessToken = response.body.accessToken;
  });

  afterEach(async () => {
    await reviewRepository.delete({});
    await bookRepository.delete({});
  });

  afterAll(async () => {
    await userRepository.delete({});
    await app.close();
  });

  it("/POST /review에 review 등록시 201 Created와 review 내용 반환", async () => {
    // given
    const reviewData = {
      "bookTitle": "greeng00se 장편선",
      "bookImage": "https:\/\/fake.example.com\/asdf\/123\/456\/12345678.jpg?type=m1&udate=amavvdko",
      "bookAuthor": "qilip",
      "bookPublisher": "곤운",
      "bookPubdate": "2016-01-01",
      "bookIsbn": "9791141844829",
      "title": "qilip의 greeng00se 사냥기 100.0",
      "rating": 9,
      "status": true,
      "description": "독서록 내용"
    }
    
    // expect
    const response = await request(app.getHttpServer())
      .post("/review")
      .auth(auth.accessToken, { type: 'bearer' })
      .send(reviewData)
      .expect(201);

    const reviewId = Number(response.text);
    const savedReview = await reviewRepository.findOneBy({ id: reviewId })
    expect(savedReview.title).toStrictEqual(reviewData.title);
    expect(savedReview.description).toStrictEqual(reviewData.description);
  });
});

