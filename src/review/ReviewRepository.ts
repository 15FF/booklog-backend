import { NotFoundException } from "@nestjs/common";
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
      .leftJoinAndSelect(User, "user", "user.id = user_id")
      .leftJoinAndSelect(Book, "book", "book.id = book_id")
      .select([
        "review.id AS id",
        "review.title AS title",
        "review.rating AS rating",
        "review.description AS description",
        "review.status AS status",
        "review.createdAt AS createdAt",
        "user.username AS username",
        "book.title AS bookTitle",
        "book.image AS bookImage",
        "book.author AS bookAuthor",
        "book.publisher AS bookPublisher",
      ])
      .where("review.status = :status", {status: ReviewStatus.PUBLIC})
      .orderBy({"id": "DESC"})
      .limit(param.getLimit())
      .offset(param.getOffset())
      .getRawMany();
    return new ReviewListResponseDto(plainToInstance(ReviewResponseDto, reviews));
  }

  async findByReviewId(reviewId: number): Promise<ReviewResponseDto> {
    const review = await this.createQueryBuilder()
      .leftJoinAndSelect(User, "user", "user.id = user_id")
      .leftJoinAndSelect(Book, "book", "book.id = book_id")
      .select([
        "review.id AS id",
        "review.title AS title",
        "review.rating AS rating",
        "review.description AS description",
        "review.status AS status",
        "review.createdAt AS createdAt",
        "user.username AS username",
        "book.title AS bookTitle",
        "book.image AS bookImage",
        "book.author AS bookAuthor",
        "book.publisher AS bookPublisher",
      ])
      .where("review.id = :id", { id: reviewId })
      .getRawOne();
    if (!review) {
      throw new NotFoundException(`Review with id ${reviewId} not found`);
    }
    return plainToInstance(ReviewResponseDto, review);
  }
}