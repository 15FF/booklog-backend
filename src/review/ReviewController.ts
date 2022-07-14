import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/GetUserDecorator';
import { User } from 'src/auth/User.entity';
import { BookSaveDto } from './dto/BookSaveDto';
import { ReviewSaveDto } from './dto/ReviewSaveDto';
import { ReviewSaveRequestDto } from './dto/ReviewSaveRequestDto';
import { ReviewService } from './ReviewService';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: '독서록 등록' })
  @UseGuards(AuthGuard())
  save(@Body() reviewSaveRequestDto: ReviewSaveRequestDto, @GetUser() user: User): Promise<number> {
    const bookSaveDto: BookSaveDto = reviewSaveRequestDto.toBookSaveDto();
    const reviewSaveDto: ReviewSaveDto = reviewSaveRequestDto.toReviewSaveDto(user);
    return this.reviewService.saveReview(bookSaveDto, reviewSaveDto);
  }
}
