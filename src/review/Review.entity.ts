import { User } from "src/auth/User.entity";
import { Book } from "src/book/Book.entity";
import { BaseTimeEntity } from "src/db/time/BaseTimeEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ReviewStatus } from "./enum/ReviewStatus";

@Entity()
export class Review extends BaseTimeEntity {
  @Column()
  title: string;

  @ManyToOne(_type => User)
  @JoinColumn({ name : 'user_id' })
  user: User;

  @Column({ nullable: true })
  user_id: number

  @ManyToOne(_type => Book)
  @JoinColumn({ name : 'book_id' })
  book: Book;

  @Column({ nullable: true })
  book_id: number

  @Column()
  rating: number;

  @Column()
  status: ReviewStatus;

  @Column()
  description: string;

  static from(title: string, user: User, book: Book, rating: number, status: ReviewStatus, description: string): Review {
    const review = new Review()
    review.title = title;
    review.user = user;
    review.book = book;
    review.rating = rating;
    review.status = status;
    review.description = description;
    return review;
  }
}