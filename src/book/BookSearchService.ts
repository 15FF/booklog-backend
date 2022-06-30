import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class BookSearchService {
  private readonly URL: string = 'https://openapi.naver.com/v1/search/book.json';
  private readonly API_KEY = {
    'X-Naver-Client-Id': process.env.BOOKAPI_ID,
    'X-Naver-Client-Secret': process.env.BOOKAPI_PW
  };
  
  constructor (
      private readonly httpService: HttpService,
  ) {}
    
  public async callBookApi(bookQuery: string): Promise<any> {
    const params = { query: bookQuery };
    const apiResult = await firstValueFrom(this.httpService.get(this.URL, { params, headers: this.API_KEY }));
    return apiResult.data;
  }
}