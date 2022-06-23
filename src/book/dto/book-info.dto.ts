import { LocalDate } from "@js-joda/core";

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
}
