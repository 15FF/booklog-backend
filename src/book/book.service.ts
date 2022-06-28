import { Injectable } from '@nestjs/common';
import { BookSearchService } from './book-search.service';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
  constructor(
    private bookRepository: BookRepository,
    private bookSearchService: BookSearchService
  ) {}

  getBooks(bookQuery: string) {
    const responseBookListDto = this.bookSearchService.callBookApi(bookQuery);
    return responseBookListDto;
  }
}
