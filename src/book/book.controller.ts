import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BookController {
  constructor(private booksService: BookService) {}
  
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }

  @Get()
  getBooks(@Query('bookQuery') bookQuery: string) {
    return this.booksService.getBooks(bookQuery);
  }
}
