import { LocalDate } from "@js-joda/core";
import { BaseTimeEntity } from "src/db/time/BaseTimeEntity";
import { LocalDateTransformer } from "src/db/time/transformer/LocalDateTransformer";
import { Column, Entity } from "typeorm";

@Entity()
export class Book extends BaseTimeEntity {
  @Column()
  title: string;

  @Column()
  author: string;
  
  @Column()
  publisher: string;

  @Column()
  isbn: string;

  @Column({
    type: 'timestamp',
    transformer: new LocalDateTransformer(),
  })
  pubdate: LocalDate;
  
  static from(title: string, author: string, publisher: string, isbn: string, pubdate: LocalDate): Book {
    const book = new Book()
    book.title = title;
    book.author = author;
    book.publisher = publisher;
    book.isbn = isbn;
    book.pubdate = pubdate;
    return book;
  }
}