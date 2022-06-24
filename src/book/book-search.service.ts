import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { ResponseBookListDto } from "./dto/response-book-list.dto";
import { ApiResultCoverter } from "./helper/api-result.converter";

@Injectable()
export class BookSearchService {
  private readonly URL: string = 'https://openapi.naver.com/v1/search/book.json';
  private readonly API_KEY = {
    'X-Naver-Client-Id': process.env.BOOKAPI_ID,
    'X-Naver-Client-Secret': process.env.BOOKAPI_PW
  };
  
  constructor (
      private readonly httpService: HttpService,
      private readonly apiResultCoverter: ApiResultCoverter
  ) {}
    
  public async callBookApi(bookQuery: string): Promise<ResponseBookListDto> {
    const params = { query: bookQuery };
    
    const searchResult = await firstValueFrom(this.httpService.get(this.URL, { params, headers: this.API_KEY }));
    const bookInfoDtos = this.apiResultCoverter.toBookInfoDtos(searchResult.data);
    const responseBookListDto = new ResponseBookListDto(bookInfoDtos.length, bookInfoDtos);
    return responseBookListDto;
  }
}