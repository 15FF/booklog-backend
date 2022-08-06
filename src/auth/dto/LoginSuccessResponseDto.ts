import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginSuccessResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '토큰',
    type: String,
  })
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '사용자명',
    type: String,
  })
  username: string;

  constructor(accessToken: string, username: string) {
    this.accessToken = accessToken;
    this.username = username;
  }
}
