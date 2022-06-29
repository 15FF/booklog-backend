import { BookInfoDto } from "./BookInfoDto";

export class BookListResponseDto {
  count: number;
  items: BookInfoDto[];

  constructor(count: number, items: BookInfoDto[]) {
    this.count = count;
    this.items = items;
  }
}
