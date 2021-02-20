import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Patch,
  Param,
  UnauthorizedException,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { CredentialsDto } from './dtos/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { GetUser } from './get-user.decorator';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { UserRole } from '../users/enums/user-roles.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto, UserWithTokenDto } from 'src/users/dtos/user.dto';
import { SendRecoverEmailDto } from './dtos/send-recover-email.dto';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /*
   * Signup
   */
  @Post('/signup')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({
    summary: 'Cadastrando um usuário',
  })
  @ApiResponse({
    description: 'Usuário cadastrado com sucesso.',
    status: HttpStatus.CREATED,
    type: UserDto,
  })
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<UserDto> {
    return await this.authService.signUp(createUserDto);
  }

  /*
   * Login
   */
  @Post('/login')
  @ApiBody({ type: CredentialsDto })
  @ApiOperation({
    summary: 'Login',
  })
  @ApiResponse({
    description: 'Usuário logado com sucesso.',
    status: HttpStatus.OK,
    type: UserWithTokenDto,
  })
  async signIn(
    @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
  ): Promise<UserWithTokenDto> {
    return await this.authService.signIn(credentiaslsDto);
  }

  /*
   * Confirm Email
   */
  @Patch(':token')
  @ApiOperation({
    summary: 'Confirmando email',
  })
  @ApiResponse({
    description: 'Email confirmado com sucesso.',
    status: HttpStatus.OK,
  })
  async confirmEmail(@Param('token') token: string): Promise<void> {
    await this.authService.confirmEmail(token);
  }

  /*
   * Send Recover Email
   */
  @Post('/send-recover-email')
  @ApiBody({ type: SendRecoverEmailDto })
  @ApiOperation({
    summary: 'Enviando email de recuperação',
  })
  @ApiResponse({
    description: 'Email de recuperação enviado com sucesso.',
    status: HttpStatus.OK,
  })
  async sendRecoverPasswordEmail(@Body('email') email: string): Promise<void> {
    await this.authService.sendRecoverPasswordEmail(email);
  }

  /*
   * Reset Password Email
   */
  @Patch('/reset-password')
  @ApiBearerAuth()
  @ApiBody({ type: ChangePasswordDto })
  @ApiOperation({
    summary: 'Resentando senha',
  })
  @ApiResponse({
    description: 'Senha resetada com sucesso.',
    status: HttpStatus.OK,
  })
  async resetPassword(
    @Headers('Authorization') token: string,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    await this.authService.resetPassword(token, changePasswordDto);
  }

  /*
   * Change Password
   */
  @Patch(':id/change-password')
  @ApiBody({ type: ChangePasswordDto })
  @ApiOperation({
    summary: 'Alterando senha',
  })
  @ApiResponse({
    description: 'Senha alterada com sucesso.',
    status: HttpStatus.OK,
  })
  @UseGuards(AuthGuard())
  async changePassword(
    @Param('id') id: string,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
    @GetUser() user: User,
  ): Promise<void> {
    if (user.role !== UserRole.ADMIN && user.id.toString() !== id)
      throw new UnauthorizedException(
        'Você não tem permissão para realizar esta operação',
      );

    await this.authService.changePassword(id, changePasswordDto);
  }

  @Get('/me')
  @ApiOperation({
    summary: 'Recuperando dados do usuário pelo token',
  })
  @ApiResponse({
    description: 'Usuário',
    status: HttpStatus.OK,
    type: UserDto,
  })
  @UseGuards(AuthGuard())
  getMe(@GetUser() user: User): UserDto {
    return user;
  }
}
