import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import 'dotenv/config';
import { User } from "src/auth/User.entity";
import { UserRepository } from "src/auth/UserRepository";
import { typeORMConfig } from "src/config/TypeOrmConfig";
import { ReviewSaveRequestDto } from "src/review/dto/ReviewSaveRequestDto";
import { ReviewStatus } from "src/review/enum/ReviewStatus";
import { ReviewController } from "src/review/ReviewController";
import { ReviewModule } from "src/review/ReviewModule";
import { ReviewRepository } from "src/review/ReviewRepository";

describe('[ReviewController]', () => {
  let app: INestApplication;
  let reviewRepository: ReviewRepository;
  let userRepository: UserRepository;
  let sut: ReviewController;
  let user: User;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        ReviewModule,
      ]
    }).compile();

    reviewRepository = moduleRef.get<ReviewRepository>(ReviewRepository);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
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
  });

  afterEach(async () => {
    await reviewRepository.delete({});
  });

  afterAll(async () => {
    await userRepository.delete({});
    await app.close();
  });

  it('독서록 저장', async () => {
    // given
    const reviewSaveRequestDto: ReviewSaveRequestDto = dummyReviewSaveRequestDto();

    // when
    await sut.save(reviewSaveRequestDto, user);

    // then
    const count = await reviewRepository.count();
    expect(count).toBe(1);
  });
});

function dummyReviewSaveRequestDto(): ReviewSaveRequestDto {
  return new ReviewSaveRequestDto (
    "greeng00se 장편선",
    "https:\/\/fake.example.com\/asdf\/123\/456\/12345678.jpg?type=m1&udate=amavvdko",
    "qilip",
    "곤운",
    "2016-01-01",
    "9791141844829",
    "qilip의 greeng00se 사냥기 100.0",
    9,
    ReviewStatus.PUBLIC,
    "독서록 내용"
  );
}
