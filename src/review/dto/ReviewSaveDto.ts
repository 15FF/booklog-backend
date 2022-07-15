import { User } from "src/auth/User.entity";
import { Book } from "src/book/Book.entity";
import { ReviewStatus } from "../enum/ReviewStatus";
import { Review } from "../Review.entity";

export class ReviewSaveDto {
  title: string;
  rating: number;
  user: User;
  status: ReviewStatus;
  description: string;

  constructor(title: string, rating: number, user: User,
    status: ReviewStatus, description: string) {
    this.title = title;
    this.rating = rating;
    this.user = user;
    this.status = status;
    this.description = description;
  }

  to(book: Book): Review {
    return Review.from(this.title, this.user, book, this.rating, this.status, this.description);
  }
}