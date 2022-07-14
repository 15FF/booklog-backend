import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto {

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    description: '사용자명',
    type: String
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    description: '비밀번호',
    type: String
  })
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}