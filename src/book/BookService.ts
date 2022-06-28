import { Injectable } from '@nestjs/common';
import { BookRepository } from './BookRepository';
import { BookSearchService } from './BookSearchService';

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
