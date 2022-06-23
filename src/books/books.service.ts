import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { BookInfoDto } from './dto/book-info.dto';
import { ResponseBookListDto } from './dto/response-book-list.dto';
import { DateTimeFormatter, LocalDate } from '@js-joda/core';

@Injectable()
export class BooksService {
  constructor(
    private bookRepository: BookRepository,
    private readonly httpService: HttpService
  ) {}

  createBook(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.createBook(createBookDto);
  }

  async getBooks(searchValue: string) {
    const url = 'https://openapi.naver.com/v1/search/book.json';
    const params = { query: searchValue };
    const headers = {
      'X-Naver-Client-Id': process.env.BOOKAPI_ID,
      'X-Naver-Client-Secret': process.env.BOOKAPI_PW
    };
    const bookInfoArray = await firstValueFrom(this.httpService.get(url, { params, headers }));
    const dateTimeFormatter = DateTimeFormatter.ofPattern('yyyyMMdd');

    const responseBookDtos = bookInfoArray.data.items.map(bookInfo => {
      return new BookInfoDto(
        bookInfo.title.replace(/<[^>]*>?/g, ''),
        bookInfo.image,
        bookInfo.author.replace(/<[^>]*>?/g, ''),
        bookInfo.publisher.replace(/<[^>]*>?/g, ''),
        //! API에서 Date가 4자리인 경우가 있어 패딩을 추가해줌
        LocalDate.parse(bookInfo.pubdate.padEnd(8, '19000101'), dateTimeFormatter),
        bookInfo.isbn.replace(/<[^>]*>?/g, '').split(' ')[1]);
    });

    console.log(responseBookDtos);
    const responseBookListDto = new ResponseBookListDto(responseBookDtos.length, responseBookDtos);
    return responseBookListDto;
  }
}
