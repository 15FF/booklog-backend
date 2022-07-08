import { Book } from "src/book/Book.entity";
import { Review } from "../Review.entity";

export class ReviewSaveDto {
  title: string;
  user: string;
  rating: number;
  status: boolean;
  description: string;

  constructor(title: string, user: string, rating: number,
    status: boolean, description: string) {
    this.title = title;
    this.user = user;
    this.rating = rating;
    this.status = status;
    this.description = description;
  }

  to(book: Book): Review {
    return Review.from(this.title, this.user, book, this.rating, this.status, this.description);
  }
}