import { ApiProperty } from '@nestjs/swagger';
import { ResultQueryPaged } from 'src/shared/dtos/result-query-paged.dto';
import { UserDto } from './user.dto';

export class ResultUsersQueryPagedDto extends ResultQueryPaged {
  @ApiProperty({ type: [UserDto] })
  data: UserDto[];
}
