import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { User } from "src/auth/User.entity";
import { ReviewStatus } from "../enum/ReviewStatus";
import { BookSaveDto } from "./BookSaveDto";
import { ReviewSaveDto } from "./ReviewSaveDto";

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
  @ApiProperty({type: Number})
  rating: number;

  @IsNotEmpty()
  @ApiProperty({ enum: [ ReviewStatus.PRIVATE, ReviewStatus.PUBLIC ]})
  status: ReviewStatus;

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

  toReviewSaveDto(user: User): ReviewSaveDto {
    return new ReviewSaveDto(
      this.title,
      this.rating,
      user,
      this.status,
      this.description
    );
  }
}