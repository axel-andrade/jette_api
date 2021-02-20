import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryParametersDto } from '../../shared/dtos/base-query-paramers.dto';
import { UserRole } from '../enums/user-roles.enum';

export class FindUsersQueryDto extends BaseQueryParametersDto {
  @ApiPropertyOptional({
    description: 'Nome do usuário',
    example: 'joão',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Email do usuário',
    example: 'joao.silva@email.com',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'Status do usuário',
    example: true,
  })
  status: boolean;

  @ApiPropertyOptional({
    description: 'Papel do usuário no sistema',
    example: UserRole.ADMIN,
    enum: UserRole,
  })
  role: UserRole;
}
