import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ReviewSaveRequestDto } from './dto/reviewSaveRequestDto';
import { ReviewService } from './ReviewService';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @ApiCreatedResponse({ description: '독서록 등록' })
  saveReview(@Body(new ValidationPipe({
    transform: true
  })) reviewSaveRequestDto: ReviewSaveRequestDto) {
    return this.reviewService.saveReview(reviewSaveRequestDto.toBookSaveDto(),
      reviewSaveRequestDto.toReviewSaveDto());
  }
}
