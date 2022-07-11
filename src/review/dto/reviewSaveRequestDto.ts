import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { BookSaveDto } from "./bookSaveDto";
import { ReviewSaveDto } from "./reviewSaveDto";

export class ReviewSaveRequestDto {
  @IsNotEmpty()
  @ApiProperty({type: String})
  bookTitle: string;

  @IsNotEmpty()
  @ApiProperty({type: String})
  bookImage: string;

  @IsNotEmpty()
  @ApiProperty({type: String})
  bookAuthor: string;

  @IsNotEmpty()
  @ApiProperty({type: String})
  bookPublisher: string;

  @IsNotEmpty()
  @ApiProperty({type: String})
  bookPubdate: string;

  @IsNotEmpty()
  @ApiProperty({type: String})
  bookIsbn: string;

  @IsNotEmpty()
  @ApiProperty({type: String})
  title: string;

  @IsNotEmpty()
  @ApiProperty({type: String})
  user: string;

  @IsNotEmpty()
  @ApiProperty({type: Number})
  rating: number;

  @IsNotEmpty()
  @ApiProperty({type: Boolean})
  status: boolean;

  @IsNotEmpty()
  @ApiProperty({type: String})
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