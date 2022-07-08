import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './AuthService';
import { AuthCredentialDto } from './dto/AuthCredentialDto';
import { GetUser } from './GetUserDecorator';
import { User } from './User.entity';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('/register')
  @ApiCreatedResponse({ description: '회원가입' })
  register(@Body(new ValidationPipe({ transform: true })) authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.register(authCredentialDto);
  }

  @Post('/signin')
  @ApiOkResponse({ description: '로그인' })
  signIn(@Body(new ValidationPipe({ transform: true })) authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
    return this.authService.signIn(authCredentialDto);
  }

  @Post('/test')
  @ApiBearerAuth()
  @ApiResponse({ description: 'Auth Guard TEST' })
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
      console.log(user);
  }
}
