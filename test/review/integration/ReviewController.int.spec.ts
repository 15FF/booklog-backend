import { LocalDate } from "@js-joda/core";
import { INestApplication, ValidationPipe } from "@nestjs/common";
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
import { ReviewSaveRequestDto } from "src/review/dto/ReviewSaveRequestDto";
import { ReviewUpdateRequestDto } from "src/review/dto/ReviewUpdateRequestDto";
import { ReviewStatus } from "src/review/enum/ReviewStatus";
import { Review } from "src/review/Review.entity";
import { ReviewController } from "src/review/ReviewController";
import { ReviewModule } from "src/review/ReviewModule";
import { ReviewRepository } from "src/review/ReviewRepository";

describe('[ReviewController]', () => {
  let app: INestApplication;
  let reviewRepository: ReviewRepository;
  let userRepository: UserRepository;
  let bookRepository: BookRepository;
  let sut: ReviewController;
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
    sut = moduleRef.get<ReviewController>(ReviewController);
    
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      transform: true
    }));
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

  it('독서록 저장', async () => {
    // given
    const reviewSaveRequestDto: ReviewSaveRequestDto = dummyReviewSaveRequestDto();

    // when
    await sut.saveReview(reviewSaveRequestDto, user);

    // then
    const count = await reviewRepository.count();
    expect(count).toBe(1);
  });

  it('독서록 수정', async () => {
    // given
    const review = dummyReview();
    await reviewRepository.save(review);
    const reviewUpdateRequestDto: ReviewUpdateRequestDto = new ReviewUpdateRequestDto(
      "단편후기",
      3,
      ReviewStatus.PUBLIC,
      "재미있나?",
    );

    // when
    const id = await sut.updateReview(reviewUpdateRequestDto, review.id, user);

    // then
    const savedReview = await reviewRepository.findOneBy({id: id});
    expect(savedReview.description).toBe(reviewUpdateRequestDto.description);
  });

  it('독서록 삭제', async () => {
    // given
    const review = dummyReview();
    await reviewRepository.save(review);
    
    // when
    const id = await sut.deleteReview(review.id, user);

    // then
    const count = await reviewRepository.count();
    expect(count).toBe(0);
  });

  it('독서록 전체 조회', async () => {
    // given
    await reviewRepository.save(dummyReview());
    await reviewRepository.save(dummyReview());
    
    const param = new ReviewRequestDto(1, 9);
    
    // when
    const result: ReviewListResponseDto = await sut.findRangeReview(param);

    // then
    expect(result.count).toBe(2);
  });

  it('개별 독서록 조회', async () => {
    // given
    const dummyResult = await reviewRepository.save(dummyReview());
    await reviewRepository.save(dummyReview());

    // when
    const review = await sut.findOneReview(dummyResult.id);

    // then
    expect(review.id).toBe(dummyResult.id);
  });

  function dummyReviewSaveRequestDto(): ReviewSaveRequestDto {
    const result: ReviewSaveRequestDto = new ReviewSaveRequestDto();
    result.bookTitle = "greeng00se 장편선";
    result.bookImage = "https:\/\/fake.example.com\/asdf\/123\/456\/12345678.jpg?type=m1&udate=amavvdko";
    result.bookAuthor = "qilip";
    result.bookPublisher = "곤운";
    result.bookPubdate = "2016-01-01";
    result.bookIsbn = "9791141844829";
    result.title = "qilip의 greeng00se 사냥기 100.0";
    result.rating = 9;
    result.status = ReviewStatus.PUBLIC;
    result.description = "독서록 내용";
    return result;
  }
  
  function dummyReview(): Review {
    return Review.from(
      "장편후기",
      user,
      book,
      5,
      ReviewStatus.PUBLIC,
      "재밌네",
    );
  }
});
