import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetBooksQueryDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '책 검색 쿼리',
    type: String
  })
  bookQuery: string;
}
