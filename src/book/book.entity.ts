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
  category: string;

  @Column()
  publisher: string;

  static from(title: string, author: string, category: string, publisher: string): Book {
    const book = new Book()
    book.title = title;
    book.author = author;
    book.category = category;
    book.publisher = publisher;
    return book;
  }
}