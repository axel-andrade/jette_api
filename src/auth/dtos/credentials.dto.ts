import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Ad@1234',
  })
  password: string;
}
