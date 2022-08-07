import { LocalDateTime } from "@js-joda/core";
import { ReviewStatus } from "../enum/ReviewStatus";

export class ReviewResponseDto {
  id: number;
  title: string;
  rating: number;
  description: string;
  username: string;
  status: ReviewStatus;
  createdAt: LocalDateTime;
  bookTitle: string;
  bookImage: string;
  bookAuthor: string;
  bookPublisher: string;
}