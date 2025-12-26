import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDTO } from './sigin.dto';
import { CreateUserDTO } from 'src/users/dto/create_user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO);
  }

  @Public()
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDTO): Promise<any> {
    const user = await this.authService.signUp(createUserDto);

    return { user };
  }
}
