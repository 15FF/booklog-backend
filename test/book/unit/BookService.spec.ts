import { LocalDate } from "@js-joda/core";
import { BookRepository } from "src/book/BookRepository";
import { BookSearchService } from "src/book/BookSearchService";
import { BookService } from "src/book/BookService";
import { BookInfoDto } from "src/book/dto/BookInfoDto";
import { BookListResponseDto } from "src/book/dto/BookListResponseDto";
import { ApiResultTransformer } from "src/book/transformer/ApiResultTransformer";
import { instance, mock, when } from "ts-mockito";

describe('BookService', () => {

  it('getBooks를 호출하면 BookSearchService가 BookListResponseDto 오브젝트를 반환한다.', async () => {
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
          "pubdate": "2016", // 연도 4자리만 들어오는 케이스가 존재
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
    const bookInfoDtos: BookInfoDto[] = [
      new BookInfoDto(
        'greeng00se 단편선', 
        'https:\/\/fake.example.com\/asdf\/123\/456\/12345678.jpg?type=m1&udate=amavvdko',
        'qilip',
        '곤운',
        LocalDate.of(2016, 1, 1),
        '9791141844822'
      ),
      new BookInfoDto(
        'qilip 단편선',
        'https:\/\/fake.example.com\/asdf\/123\/456\/12345678.jpg?type=m1&udate=fdsaf',
        'qilip',
        '곤운',
        LocalDate.of(2019, 12, 12),
        '9791141844821'
      )
    ];
    const bookListResponseDto: BookListResponseDto = new BookListResponseDto(2, bookInfoDtos);
    
    const mockSearchService: BookSearchService = mock(BookSearchService);
    when(mockSearchService.callBookApi("qilip")).thenResolve(naverSearchApiResult);

    const mockRepository: BookRepository = mock(BookRepository);
    
    const mockTransformer: ApiResultTransformer = mock(ApiResultTransformer);
    when(mockTransformer.toBookInfoDtos(naverSearchApiResult)).thenReturn(bookInfoDtos);
    
    const sut = new BookService(instance(mockRepository), instance(mockSearchService), instance(mockTransformer));

    // when
    const result = await sut.getBooks("qilip");

    // then
    expect(result).toStrictEqual(bookListResponseDto);
  })
})