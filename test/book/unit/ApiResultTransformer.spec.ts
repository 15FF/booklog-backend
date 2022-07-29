import { LocalDate } from "@js-joda/core";
import { BookInfoDto } from "src/book/dto/BookInfoDto";
import { ApiResultTransformer } from "src/book/transformer/ApiResultTransformer";

describe('[ApiResultTransformer]', () => {
  const apiResultCoverter: ApiResultTransformer = new ApiResultTransformer();

  it('Naver Search API 반환 결과를 bookInfoDto 배열로 변환한다', () => {
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
        'qilip, greeng00se',
        '곤운',
        LocalDate.of(2019, 12, 12),
        '9791141844821'
      )
    ];

    // when
    const convertResult: BookInfoDto[] = apiResultCoverter.toBookInfoDtos(naverSearchApiResult);

    // then
    expect(convertResult).toStrictEqual(bookInfoDtos);
  });
});