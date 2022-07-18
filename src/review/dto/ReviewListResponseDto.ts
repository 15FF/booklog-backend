import { ReviewResponseDto } from "./ReviewResponseDto";

export class ReviewListResponseDto {
  reviews: ReviewResponseDto[];
  count: number;

  constructor(reviews: ReviewResponseDto[]) {
    this.reviews = reviews;
    this.count = reviews.length;
  }
}
