import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import 'dotenv/config';
import { UserRepository } from "src/auth/UserRepository";
import { typeORMConfig } from "src/config/TypeOrmConfig";
import { ReviewSaveRequestDto } from "src/review/dto/reviewSaveRequestDto";
import { ReviewModule } from "src/review/ReviewModule";
import { ReviewRepository } from "src/review/ReviewRepository";
import { ReviewService } from "src/review/ReviewService";

describe('[BookService]', () => {
  let app: INestApplication;
  let reviewRepository: ReviewRepository;
  let reviewService: ReviewService;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        ReviewModule,
      ]
    }).compile();

    reviewRepository = moduleRef.get<ReviewRepository>(ReviewRepository);
    reviewService = moduleRef.get<ReviewService>(ReviewService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
    
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      transform: true
    }));
    await app.init();
  });

  afterEach(async () => {
    await reviewRepository.delete({});
    await userRepository.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('독서록 저장', async () => {
    // given
    const user = {
      'username': 'username',
      'password': 'password',
    }
    await userRepository.createUser(user);
    const savedUser = await userRepository.findOneBy({ username: user.username });
    
    const reviewSaveRequestDto: ReviewSaveRequestDto = new ReviewSaveRequestDto (
      "greeng00se 장편선",
      "https:\/\/fake.example.com\/asdf\/123\/456\/12345678.jpg?type=m1&udate=amavvdko",
      "qilip",
      "곤운",
      "2016-01-01",
      "9791141844829",
      "qilip의 greeng00se 사냥기 100.0",
      9,
      true,
      "독서록 내용"
    );

    // when
    await reviewService.saveReview(
      reviewSaveRequestDto.toBookSaveDto(), 
      reviewSaveRequestDto.toReviewSaveDto(savedUser)
    );

    // then
    const count = await reviewRepository.count();
    expect(count).toBe(1);
  });
});