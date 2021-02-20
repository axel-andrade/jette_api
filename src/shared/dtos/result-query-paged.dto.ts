import { ApiProperty } from '@nestjs/swagger';
export class ResultQueryPaged {
  @ApiProperty({
    description: 'Total de documentos',
    example: 10,
  })
  total: number;

  @ApiProperty({
    description: 'Limite',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Página',
    example: 0,
  })
  page: number;

  @ApiProperty({
    description: 'Total de páginas existentes',
    example: 10,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Existe página anterior ?',
    example: 10,
  })
  hasPrevPage: boolean;

  @ApiProperty({
    description: 'Existe próxima página ?',
    example: 10,
  })
  hasNextPage: boolean;

  @ApiProperty({
    description: 'Número da página anterior',
    example: 2,
  })
  prevPage?: number;

  @ApiProperty({
    description: 'Número da próxima página',
    example: 10,
  })
  nextPage?: number;
}
