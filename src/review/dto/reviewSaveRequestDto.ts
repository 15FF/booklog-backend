import { IsNotEmpty } from "class-validator";
import { BookSaveDto } from "./bookSaveDto";
import { ReviewSaveDto } from "./reviewSaveDto";

export class reviewSaveRequestDto {
  @IsNotEmpty()
  bookTitle: string;

  @IsNotEmpty()
  bookImage: string;

  @IsNotEmpty()
  bookAuthor: string;

  @IsNotEmpty()
  bookPublisher: string;

  @IsNotEmpty()
  bookPubdate: string;

  @IsNotEmpty()
  bookIsbn: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  status: boolean;

  @IsNotEmpty()
  description: string;

  toBookSaveDto(): BookSaveDto {
    return new BookSaveDto(
      this.bookTitle,
      this.bookImage,
      this.bookAuthor,
      this.bookPublisher,
      this.bookPubdate,
      this.bookIsbn
    );
  }

  toReviewSaveDto(): ReviewSaveDto {
    return new ReviewSaveDto(
      this.title,
      this.user,
      this.rating,
      this.status,
      this.description
    );
  }
}