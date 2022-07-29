import { Injectable } from '@nestjs/common';
import { BookRepository } from './BookRepository';
import { BookSearchService } from './BookSearchService';
import { BookListResponseDto } from './dto/BookListResponseDto';
import { ApiResultTransformer } from './transformer/ApiResultTransformer';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly bookSearchService: BookSearchService,
    private readonly apiResultTransformer: ApiResultTransformer
  ) {}

  async getBooks(bookQuery: string): Promise<BookListResponseDto> {
    const searchResult = await this.bookSearchService.callBookApi(bookQuery);
    const bookInfoDtos = this.apiResultTransformer.toBookInfoDtos(searchResult);
    return new BookListResponseDto(bookInfoDtos.length, bookInfoDtos);
  }
}
