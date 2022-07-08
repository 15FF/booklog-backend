import { Book } from "src/book/Book.entity";
import { BaseTimeEntity } from "src/db/time/BaseTimeEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Review extends BaseTimeEntity {
  @Column()
  title: string;

  @Column()
  user: string;

  @ManyToOne(type => Book)
  @JoinColumn()
  book: Book;

  @Column()
  rating: number;

  @Column()
  status: boolean;

  @Column()
  description: string;

  static from(title: string, user: string, book: Book, rating: number, status: boolean, description: string): Review {
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