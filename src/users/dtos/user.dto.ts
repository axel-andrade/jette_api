import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums/user-roles.enum';

export class UserDto {
  @ApiProperty({
    description: 'O uuid do usuário',
    example: '6bcb7708-4539-4ed3-afe0-1121a428d325uu',
  })
  id: string;

  @ApiProperty({
    description: 'O nome do usuário',
    example: 'João',
  })
  name: string;

  @ApiProperty({
    description: 'O sobrenome do usuário',
    example: 'Silva',
  })
  lastName: string;

  @ApiProperty({
    description: 'O email do usuário',
    example: 'usuario@usuario.com.br',
  })
  email: string;

  @ApiProperty({
    description: 'O cpf do usuário',
    example: 11133668742,
  })
  cpf: string;

  @ApiProperty({
    description: 'O telefone celular do usuário',
    example: '31986542127',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'O status do usuário',
    example: true,
  })
  status: boolean;

  @ApiProperty({
    description: 'O papel do usuário no sistema',
    example: UserRole.ADMIN,
    enum: UserRole,
  })
  role: UserRole;

  @ApiProperty({ description: 'Data de criação do usuário na base.' })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da ultima atualização do usuário na base.',
  })
  updatedAt: Date;
}

export class UserWithTokenDto extends UserDto {
  @ApiProperty({
    description: 'Token de acesso',
    example: '',
  })
  token: string;
}
