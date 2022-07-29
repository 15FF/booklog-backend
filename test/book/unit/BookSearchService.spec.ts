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
          "title": "greeng00se 단편선",
          "image": "https:\/\/fake.example.com\/asdf\/123\/456\/12345678.jpg?type=m1&udate=amavvdko",
          "author": "qilip",
          "publisher": "곤운",
          "pubdate": "2016", // 연도 4자리만 들어오는 케이스가 존재
          "isbn": "9791141844822",
        },
        {
          "title": "qilip 단편선",
          "image": "https:\/\/fake.example.com\/asdf\/123\/456\/12345678.jpg?type=m1&udate=fdsaf",
          "author": "qilip^greeng00se",
          "discount": "9000000",
          "publisher": "곤운",
          "pubdate": "20191212",
          "isbn": "9791141844821",
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