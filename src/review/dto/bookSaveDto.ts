import { LocalDate } from "@js-joda/core";
import { Book } from "../../book/Book.entity";

export class BookSaveDto {
  title: string;
  image: string;
  author: string;
  publisher: string;
  pubdate: string;
  isbn: string;

  constructor(title: string, image: string, author: string,
    publisher: string, pubdate: string, isbn: string) {
    this.title = title;
    this.image = image;
    this.author = author;
    this.publisher = publisher;
    this.pubdate = pubdate;
    this.isbn = isbn;
  }

  to(): Book {;
    return Book.from(this.title, this.image, this.author, this.publisher, LocalDate.parse(this.pubdate), this.isbn);
  }
}
