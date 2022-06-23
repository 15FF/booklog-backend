import { BookInfoDto } from "./book-info.dto";

export class ResponseBookListDto {
  count: number;
  items: BookInfoDto[];

  constructor(count: number, items: BookInfoDto[]) {
    this.count = count;
    this.items = items;
  }
}
