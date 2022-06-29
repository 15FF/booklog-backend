import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { BookListResponseDto } from "./dto/BookListResponseDto";
import { ApiResultTransformer } from "./transformer/ApiResultTransformer";

@Injectable()
export class BookSearchService {
  private readonly URL: string = 'https://openapi.naver.com/v1/search/book.json';
  private readonly API_KEY = {
    'X-Naver-Client-Id': process.env.BOOKAPI_ID,
    'X-Naver-Client-Secret': process.env.BOOKAPI_PW
  };
  
  constructor (
      private readonly httpService: HttpService,
      private readonly apiResultCoverter: ApiResultTransformer
  ) {}
    
  public async callBookApi(bookQuery: string): Promise<BookListResponseDto> {
    const params = { query: bookQuery };
    
    try {
      const searchResult = await firstValueFrom(this.httpService.get(this.URL, { params, headers: this.API_KEY }));
      const bookInfoDtos = this.apiResultCoverter.toBookInfoDtos(searchResult.data);
      const bookListResponseDto = new BookListResponseDto(bookInfoDtos.length, bookInfoDtos);
      return bookListResponseDto;
    } catch (e) {
      throw new BadRequestException(["bookQuery should not be empty"]);
    }
  }
}