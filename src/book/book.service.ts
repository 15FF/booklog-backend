import { DateTimeFormatter, LocalDate } from '@js-joda/core';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';
import { BookInfoDto } from './dto/book-info.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { ResponseBookListDto } from './dto/response-book-list.dto';

@Injectable()
export class BookService {
  constructor(
    private bookRepository: BookRepository,
    private readonly httpService: HttpService
  ) {}

  createBook(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.createBook(createBookDto);
  }

  getBooks(searchValue: string) {
    const responseBookListDto = this.callBookApi(searchValue);
    console.log(responseBookListDto);
    return responseBookListDto;
  }

  async callBookApi(searchValue: string): Promise<ResponseBookListDto> {
    const url = 'https://openapi.naver.com/v1/search/book.json';
    const params = { query: searchValue };
    const headers = {
      'X-Naver-Client-Id': process.env.BOOKAPI_ID,
      'X-Naver-Client-Secret': process.env.BOOKAPI_PW
    };
    
    const searchResult = await firstValueFrom(this.httpService.get(url, { params, headers }));
    const bookInfoDtoArray = this.getResponseBookListDto(searchResult);
    const responseBookListDto = new ResponseBookListDto(bookInfoDtoArray.length, bookInfoDtoArray);
    return responseBookListDto;
  }

  getResponseBookListDto(searchResult: any): BookInfoDto[] {
    const dateTimeFormatter = DateTimeFormatter.ofPattern('yyyyMMdd');
    const htmlTagRemoveRegExp: RegExp = /<[^>]*>?/g;

    const responseBookDtos = searchResult.data.items.map(bookInfo => {
      return new BookInfoDto(
        bookInfo.title.replace(htmlTagRemoveRegExp, ''),
        bookInfo.image,
        bookInfo.author.replace(htmlTagRemoveRegExp, ''),
        bookInfo.publisher.replace(htmlTagRemoveRegExp, ''),
        //! Naver Search API에서 Date가 4자리인 경우가 있어 패딩을 추가해줌
        LocalDate.parse(bookInfo.pubdate.padEnd(8, '19000101'), dateTimeFormatter),
        bookInfo.isbn.replace(htmlTagRemoveRegExp, '').split(' ')[1]);
    });

    return responseBookDtos;
  }
}
