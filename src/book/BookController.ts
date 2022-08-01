import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from './BookService';
import { GetBooksQueryDto } from './dto/GetBooksQueryDto';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}
  
  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOkResponse({ description: '검색 쿼리에 따른 책 목록 반환' })
  getBooks(@Query() getBooksQueryDto: GetBooksQueryDto) {
    return this.bookService.getBooks(getBooksQueryDto.bookQuery);
  }
}
