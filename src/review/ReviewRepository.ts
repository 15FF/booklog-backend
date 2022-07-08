import { CustomRepository } from "src/db/TypeOrmExDecorator";
import { Repository } from "typeorm";
import { Review } from "./Review.entity";

@CustomRepository(Review)
export class ReviewRepository extends Repository<Review> {
}