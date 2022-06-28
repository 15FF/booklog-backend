import { LocalDate } from "@js-joda/core";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;
  
  @Column()
  publisher: string;

  @Column()
  isbn: string;

  @Column()
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