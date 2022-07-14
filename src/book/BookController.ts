import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from './BookService';
import { GetBooksQueryDto } from './dto/GetBooksQueryDto';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private booksService: BookService) {}
  
  @Get()
  @ApiOkResponse({ description: '검색 쿼리에 따른 책 목록 반환' })
  getBooks(@Query() getBooksQueryDto: GetBooksQueryDto) {
    return this.booksService.getBooks(getBooksQueryDto.bookQuery);
  }
}
