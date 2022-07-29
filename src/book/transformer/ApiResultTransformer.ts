import { DateTimeFormatter, LocalDate } from "@js-joda/core";
import { Injectable } from "@nestjs/common";
import { BookInfoDto } from "../dto/BookInfoDto";

@Injectable()
export class ApiResultTransformer {
  private readonly PATTERN: DateTimeFormatter = DateTimeFormatter.ofPattern('yyyyMMdd');
  private readonly PADDING = '0101';

  public toBookInfoDtos(searchResult: any): BookInfoDto[] {
    const bookInfoDtos: BookInfoDto[] = searchResult.items.map(bookInfo =>
      new BookInfoDto(
        bookInfo.title,
        bookInfo.image,
        // API의 author 반환 값이 공동저자인 경우 '^' 로 구분하는 것을 ', ' 로 구분하도록 변경
        bookInfo.author.replaceAll('^', ', '),
        bookInfo.publisher,
        this.stringToLocalDate(bookInfo.pubdate),
        // API의 ISBN 반환값이 신ISBN 형식만 오도록 변경됨
        bookInfo.isbn
      )
    );
    return bookInfoDtos;
  }

  private stringToLocalDate(pubdate: string): LocalDate {
    const localDate: LocalDate = LocalDate.parse(
      // API의 pubdate 반환 값이 4자리인 경우가 존재함으로 8자가 되도록 패딩 추가
      pubdate.padEnd(8, this.PADDING),
      this.PATTERN
    );
    return localDate;
  }
}