import { LocalDate } from "@js-joda/core";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import 'dotenv/config';
import { User } from "src/auth/User.entity";
import { UserRepository } from "src/auth/UserRepository";
import { Book } from "src/book/Book.entity";
import { BookRepository } from "src/book/BookRepository";
import { typeORMConfig } from "src/config/TypeOrmConfig";
import { ReviewListResponseDto } from "src/review/dto/ReviewListResponseDto";
import { ReviewRequestDto } from "src/review/dto/ReviewRequestDto";
import { ReviewStatus } from "src/review/enum/ReviewStatus";
import { Review } from "src/review/Review.entity";
import { ReviewModule } from "src/review/ReviewModule";
import { ReviewRepository } from "src/review/ReviewRepository";

describe('[ReviewController]', () => {
  let app: INestApplication;
  let reviewRepository: ReviewRepository;
  let userRepository: UserRepository;
  let bookRepository: BookRepository;
  let user: User;
  let book: Book;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        ReviewModule,
      ]
    }).compile();

    reviewRepository = moduleRef.get<ReviewRepository>(ReviewRepository);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
    bookRepository = moduleRef.get<BookRepository>(BookRepository);
    
    app = moduleRef.createNestApplication();
    await app.init();

    // 테스트를 위한 사용자 추가
    const username = 'username';
    const password = 'password';
    await userRepository.createUser({ username, password });
    user = await userRepository.findOneBy({ username: username });

    // 테스트를  위한 책 추가
    book = Book.from(
      "greeng00se 장편선",
      "https:\/\/fake.example.com\/asdf\/123\/456\/12345678.jpg?type=m1&udate=amavvdko",
      "qilip",
      "곤운",
      LocalDate.of(2022, 10, 12),
      "9791141844830"
    )
    await bookRepository.save(book);
  });

  afterEach(async () => {
    await reviewRepository.delete({});
  });

  afterAll(async () => {
    await userRepository.delete({});
    await bookRepository.delete({});
    await app.close();
  });

  it('독서록 전체 조회', async () => {
    // given
    for (let i = 1; i <= 30; i++) {
      await reviewRepository.save(Review.from(
        "foo" + i,
        user,
        book,
        i,
        i % 2 == 0 ? ReviewStatus.PUBLIC : ReviewStatus.PRIVATE,
        "bar" + i,
      ));
    }
    
    const param = new ReviewRequestDto(1, 9);

    // when
    const reviews: ReviewListResponseDto = await reviewRepository.findByReviewRequestDto(param);

    // then
    expect(reviews.count).toBe(9);
  });
});
