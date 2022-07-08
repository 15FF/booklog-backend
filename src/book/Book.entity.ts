import { LocalDate } from "@js-joda/core";
import { BaseTimeEntity } from "src/db/time/BaseTimeEntity";
import { LocalDateTransformer } from "src/db/time/transformer/LocalDateTransformer";
import { Column, Entity } from "typeorm";

@Entity()
export class Book extends BaseTimeEntity {
  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column({
    type: 'timestamp',
    transformer: new LocalDateTransformer(),
  })
  pubdate: LocalDate;

  @Column()
  isbn: string;

  static from(title: string, image: string, author: string, publisher: string, pubdate: LocalDate, isbn: string): Book {
    const book = new Book()
    book.title = title;
    book.image = image;
    book.author = author;
    book.publisher = publisher;
    book.pubdate = pubdate;
    book.isbn = isbn;
    return book;
  }
}