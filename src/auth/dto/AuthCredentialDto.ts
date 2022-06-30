import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto {

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}