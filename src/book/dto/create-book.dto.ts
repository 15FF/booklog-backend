import { IsNotEmpty } from "class-validator";
import { Book } from "../book.entity";

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  publisher: string;

  toEntity(): Book {
    return Book.from(this.title, this.author, this.category, this.publisher);
  }
}