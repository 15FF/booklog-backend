import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ReviewStatus } from "../enum/ReviewStatus";

export class ReviewUpdateRequestDto {
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

  constructor(
    title: string,
    rating: number,
    status: ReviewStatus,
    description: string) {
    this.title = title;
    this.rating = rating;
    this.status = status;
    this.description = description;
  }
}