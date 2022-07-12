import { Injectable } from '@nestjs/common';
import { Book } from 'src/book/Book.entity';
import { BookRepository } from 'src/book/BookRepository';
import { BookSaveDto } from './dto/bookSaveDto';
import { ReviewSaveDto } from './dto/reviewSaveDto';
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
}
