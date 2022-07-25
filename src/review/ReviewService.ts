import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/auth/User.entity';
import { Book } from 'src/book/Book.entity';
import { BookRepository } from 'src/book/BookRepository';
import { BookSaveDto } from './dto/BookSaveDto';
import { ReviewListResponseDto } from './dto/ReviewListResponseDto';
import { ReviewRequestDto } from './dto/ReviewRequestDto';
import { ReviewResponseDto } from './dto/ReviewResponseDto';
import { ReviewSaveDto } from './dto/ReviewSaveDto';
import { ReviewUpdateRequestDto } from './dto/ReviewUpdateRequestDto';
import { ReviewRepository } from './ReviewRepository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly bookRespotiroy: BookRepository,
  ) { }

  async saveReview(bookSaveDto: BookSaveDto, reviewSaveDto: ReviewSaveDto): Promise<number> {
    let book: Book = await this.bookRespotiroy.findByIsbn(bookSaveDto.isbn);
    if (book == null) {
      book = await this.bookRespotiroy.save(bookSaveDto.to())
    }
    const savedReview = await this.reviewRepository.save(reviewSaveDto.to(book));
    return savedReview.id;
  }

  async updateReview(reviewUpdateReqeustDto: ReviewUpdateRequestDto, id: number, user: User): Promise<number> {
    const review = await this.reviewRepository.findOneBy({ id });
    if (review.user_id != user.id) {
      throw new UnauthorizedException();
    }   
    return this.reviewRepository.updateByUpdateRequestDto(reviewUpdateReqeustDto, id);
  }

  async deleteReview(id: number, user: User): Promise<void> {
    const review = await this.reviewRepository.findOneBy({ id });
    if (review.user_id != user.id) {
      throw new UnauthorizedException();
    }   
    return this.reviewRepository.deleteById(id);
  }

  async findRangeReview(reviewRequestDto: ReviewRequestDto): Promise<ReviewListResponseDto> {
    return this.reviewRepository.findByReviewRequestDto(reviewRequestDto);
  }

  async findOneReview(id: number): Promise<ReviewResponseDto> {
    return this.reviewRepository.findByReviewId(id);
  }
}
