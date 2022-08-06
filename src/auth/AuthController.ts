import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './AuthService';
import { AuthCredentialDto } from './dto/AuthCredentialDto';
import { LoginSuccessResponseDto } from './dto/LoginSuccessResponseDto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiCreatedResponse({ description: '회원가입' })
  register(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.register(authCredentialDto);
  }

  @Post('/signin')
  @ApiOkResponse({ description: '로그인' })
  signIn(
    @Body() authCredentialDto: AuthCredentialDto,
  ): Promise<LoginSuccessResponseDto> {
    return this.authService.signIn(authCredentialDto);
  }
}
