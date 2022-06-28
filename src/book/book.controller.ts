import { Controller, Get, Query } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private booksService: BookService) {}
  
  @Get()
  getBooks(@Query('bookQuery') bookQuery: string) {
    return this.booksService.getBooks(bookQuery);
  }
}
