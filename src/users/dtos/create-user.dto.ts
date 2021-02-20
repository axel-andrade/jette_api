import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@gmail.com',
  })
  @IsNotEmpty({
    message: 'Informe um endereço de email',
  })
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  @MaxLength(200, {
    message: 'O endereço de email deve ter menos de 200 caracteres',
  })
  email: string;

  @ApiProperty({
    description: 'CPF do usuário',
    example: 25635412562,
  })
  @IsNotEmpty({
    message: 'Informe o cpf',
  })
  @MaxLength(14, {
    message: 'O cpf deve ter no máximo 14 caracteres',
  })
  cpf: string;

  @ApiProperty({
    description: 'Telefone celular do usuário',
    example: 31978451245,
  })
  @IsNotEmpty({
    message: 'Informe o número de celular',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João',
  })
  @IsNotEmpty({
    message: 'Informe o nome do usuário',
  })
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 caracteres',
  })
  name: string;

  @ApiProperty({
    description: 'Sobrenome do usuário',
    example: 'da Silva',
  })
  @IsNotEmpty({
    message: 'Informe o sobrenome do usuário',
  })
  @MaxLength(200, {
    message: 'O sobrenome deve ter menos de 200 caracteres',
  })
  lastName: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Ad@1234',
  })
  @IsNotEmpty({
    message: 'Informe uma senha',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbulo',
  })
  password: string;

  @ApiProperty({
    description: 'Confirmação da senha',
    example: 'Ad@1234',
  })
  @IsNotEmpty({
    message: 'Informe a confirmação de senha',
  })
  @MinLength(6, {
    message: 'A confirmação de senha deve ter no mínimo 6 caracteres',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbulo',
  })
  passwordConfirmation: string;
}
