import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/GetUserDecorator';
import { User } from 'src/auth/User.entity';
import { BookSaveDto } from './dto/BookSaveDto';
import { ReviewSaveDto } from './dto/ReviewSaveDto';
import { ReviewSaveRequestDto } from './dto/ReviewSaveRequestDto';
import { ReviewUpdateRequestDto } from './dto/ReviewUpdateRequestDto';
import { ReviewService } from './ReviewService';

@ApiTags('Review')
@UseGuards(AuthGuard())
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: '독서록 등록' })
  saveReview(
    @Body() reviewSaveRequestDto: ReviewSaveRequestDto, 
    @GetUser() user: User
  ): Promise<number> {
    const bookSaveDto: BookSaveDto = reviewSaveRequestDto.toBookSaveDto();
    const reviewSaveDto: ReviewSaveDto = reviewSaveRequestDto.toReviewSaveDto(user);
    return this.reviewService.saveReview(bookSaveDto, reviewSaveDto);
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: '독서록 수정' })
  updateReview(
    @Body() reviewUpdateReqeustDto: ReviewUpdateRequestDto, 
    @Param('id', ParseIntPipe) id: number, 
    @GetUser() user: User
  ): Promise<number> {
    return this.reviewService.updateReview(reviewUpdateReqeustDto, id, user);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: '독서록 삭제' })
  deleteReview(
    @Param('id', ParseIntPipe) id: number, 
    @GetUser() user: User
  ): Promise<void> {
    return this.reviewService.deleteReview(id, user);;
  }
}
