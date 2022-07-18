import { plainToInstance } from "class-transformer";
import { User } from "src/auth/User.entity";
import { Book } from "src/book/Book.entity";
import { CustomRepository } from "src/db/TypeOrmExDecorator";
import { Repository } from "typeorm";
import { ReviewListResponseDto } from "./dto/ReviewListResponseDto";
import { ReviewRequestDto } from "./dto/ReviewRequestDto";
import { ReviewResponseDto } from "./dto/ReviewResponseDto";
import { ReviewUpdateRequestDto } from "./dto/ReviewUpdateRequestDto";
import { ReviewStatus } from "./enum/ReviewStatus";
import { Review } from "./Review.entity";

@CustomRepository(Review)
export class ReviewRepository extends Repository<Review> {
  
  async updateByUpdateRequestDto(reviewUpdateReqeustDto: ReviewUpdateRequestDto, reviewId: number): Promise<number> {
    await this.createQueryBuilder()
      .update(Review)
      .set({ 
        title: reviewUpdateReqeustDto.title, 
        rating: reviewUpdateReqeustDto.rating,
        status: reviewUpdateReqeustDto.status,
        description: reviewUpdateReqeustDto.description 
      })
      .where("id = :id", { id: reviewId })
      .execute();
    return reviewId;
  }

  async deleteById(reviewId: number): Promise<void> {
    await this.createQueryBuilder()
      .delete()
      .from(Review)
      .where("id = :id", { id: reviewId })
      .execute()
  }

  async findByReviewRequestDto(param: ReviewRequestDto) {
    const reviews = await this.createQueryBuilder()
      .leftJoinAndSelect(User, "user", "user.id = user.id")
      .leftJoinAndSelect(Book, "book", "book.id = book.id")
      .select([
        "review.id AS id",
        "review.title AS title",
        "review.rating AS rating",
        "review.description AS description",
        "user.username AS username",
        "book.title AS bookTitle",
        "book.image AS bookImage",
        "book.author AS bookAuthor",
        "book.publisher AS bookPublisher",
      ])
      .where("review.status = :status", {status: ReviewStatus.PUBLIC})
      .limit(param.getLimit())
      .offset(param.getOffset())
      .getRawMany();

    return new ReviewListResponseDto(plainToInstance(ReviewResponseDto, reviews));
  }
}