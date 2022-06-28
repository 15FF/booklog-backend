import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { BookService } from './BookService';
import { GetBooksQueryDto } from './dto/GetBooksQueryDto';

@Controller('books')
export class BookController {
  constructor(private booksService: BookService) {}
  
  @Get()
  getBooks(@Query(new ValidationPipe({
    transform: true
  })) getBooksQueryDto: GetBooksQueryDto) {
    return this.booksService.getBooks(getBooksQueryDto.bookQuery);
  }
}
