import { CustomRepository } from "src/db/TypeOrmExDecorator";
import { Repository } from "typeorm";
import { ReviewUpdateRequestDto } from "./dto/ReviewUpdateRequestDto";
import { Review } from "./Review.entity";

@CustomRepository(Review)
export class ReviewRepository extends Repository<Review> {
  
  async updateByUpdateRequestDto(reviewUpdateReqeustDto: ReviewUpdateRequestDto, reviewId: number) {
    await this
      .createQueryBuilder()
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
}