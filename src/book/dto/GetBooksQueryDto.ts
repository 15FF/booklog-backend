import { IsNotEmpty } from "class-validator";

export class GetBooksQueryDto {
  @IsNotEmpty()
  bookQuery: string;
}
