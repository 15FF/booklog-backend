import { LocalDate } from "@js-joda/core";
import { Book } from "../Book.entity";

export class BookInfoDto {
  title: string;
  image: string;
  author: string;
  publisher: string;
  pubdate: LocalDate;
  isbn: string;

  constructor(title: string, image: string, author: string,
    publisher: string, pubdate: LocalDate, isbn: string) {
    this.title = title;
    this.image = image;
    this.author = author;
    this.publisher = publisher;
    this.pubdate = pubdate;
    this.isbn = isbn;
  }

  to(): Book {
    return Book.from(this.title, this.image, this.author, this.publisher, this.pubdate, this.isbn);
  }
}
