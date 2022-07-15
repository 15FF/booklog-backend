import { HttpService } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";
import { AxiosResponse } from "axios";
import { of } from "rxjs";
import { BookSearchService } from "src/book/BookSearchService";

describe('BookSearchService', () => {
  let sut: BookSearchService;
  let mockHttpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookSearchService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = module.get<BookSearchService>(BookSearchService);
    mockHttpService = module.get<HttpService>(HttpService);
  });
  
  it('getBooks를 호출하면 BookSearchService가 NaverSearchApiResult를 반환한다.', async () => {
    // given
    const naverSearchApiResult: any = {
      "total": 2,
      "start": 1,
      "display": 2,
      "items": [
        {
          "title": "<b>greeng00se 단편선<\/b>",
          "image": "https:\/\/fake.example.com\/asdf\/123\/456\/12345678.jpg?type=m1&udate=amavvdko",
          "author": "<b>qilip<\/b>",
          "price": "100000000",
          "discount": "9000000",
          "publisher": "곤운",
          "pubdate": "2016",
          "isbn": "1234567890 9791141844822",
        },
        {
          "title": "<b>qilip 단편선<\/b>",
          "image": "https:\/\/fake.example.com\/asdf\/123\/456\/12345678.jpg?type=m1&udate=fdsaf",
          "author": "<b>qilip<\/b>",
          "price": "vcmxlzvm",
          "discount": "9000000",
          "publisher": "곤운",
          "pubdate": "20191212",
          "isbn": "1234567890 9791141844821",
        }
      ]
    };
    const apiResult: AxiosResponse<any, any> = {
      data: naverSearchApiResult,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    
    jest.spyOn(mockHttpService, 'get').mockReturnValueOnce(
      of(apiResult)
    );
    
    // when
    const expected = await sut.callBookApi('qilip');

    // then
    expect(expected).toBe(naverSearchApiResult);
  });

})