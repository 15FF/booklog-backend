import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/auth/User.entity';
import { Book } from 'src/book/Book.entity';
import { BookRepository } from 'src/book/BookRepository';
import { BookSaveDto } from './dto/BookSaveDto';
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
    return await this.reviewRepository.updateByUpdateRequestDto(reviewUpdateReqeustDto, id);
  };


}
