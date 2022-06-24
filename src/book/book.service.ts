import { Injectable } from '@nestjs/common';
import { BookSearchService } from './book-search.service';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    private bookRepository: BookRepository,
    private bookSearchService: BookSearchService
  ) {}

  createBook(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.save(createBookDto.toEntity());
  }

  getBooks(bookQuery: string) {
    const responseBookListDto = this.bookSearchService.callBookApi(bookQuery);
    return responseBookListDto;
  }
}
