import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { reviewSaveRequestDto } from './dto/reviewSaveRequestDto';
import { ReviewService } from './ReviewService';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  saveReview(@Body(new ValidationPipe({
    transform: true
  })) reviewSaveRequestDto: reviewSaveRequestDto) {
    return this.reviewService.saveReview(reviewSaveRequestDto.toBookSaveDto(),
      reviewSaveRequestDto.toReviewSaveDto());
  }
}
