import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Patch,
  ForbiddenException,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/roles.guard';
import { Role } from '../../auth/role.decorator';
import { UserRole } from '../enums/user-roles.enum';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { GetUser } from '../../auth/get-user.decorator';
import { FindUsersQueryDto } from '../dtos/find-users-query-dto';
import { UserDto } from '../dtos/user.dto';
import { ResultUsersQueryPagedDto } from '../dtos/result-users-query-paged';

import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('v1/users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  /*
   * Create User
   */
  @Post()
  @Role(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({
    summary: 'Criando um cliente',
  })
  @ApiResponse({
    description: 'Cliente criado.',
    status: HttpStatus.CREATED,
    type: UserDto,
  })
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<UserDto> {
    return await this.usersService.createUser(createUserDto);
  }

  /*
   * Get User
   */
  @Get(':id')
  @Role(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listando um determinado usuário',
  })
  @ApiResponse({
    description: 'Usuário',
    status: HttpStatus.OK,
    type: UserDto,
  })
  async findUserById(@Param('id') id): Promise<UserDto> {
    return await this.usersService.findUserById(id);
  }

  /*
   * Update User
   */
  @Patch(':id')
  @Role(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({
    summary: 'Atualizando um usuário',
  })
  @ApiResponse({
    description: 'Usuário atualizado.',
    status: HttpStatus.OK,
    type: UserDto,
  })
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role != UserRole.ADMIN && user.id.toString() != id) {
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    } else {
      return this.usersService.updateUser(updateUserDto, id);
    }
  }

  /*
   * Delete User
   */
  @Delete(':id')
  @Role(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletando um usuário',
  })
  @ApiResponse({
    description: 'Usuário deletado com sucesso.',
    status: HttpStatus.OK,
  })
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
    return {
      message: 'Usuário removido com sucesso',
    };
  }

  /*
   * Get Users
   */
  @Get()
  @Role(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listando usuários',
  })
  @ApiResponse({
    description: 'Lista de usuários',
    status: HttpStatus.OK,
    type: ResultUsersQueryPagedDto,
  })
  async findUsers(@Query() query: FindUsersQueryDto) {
    const found = await this.usersService.findUsers(query);
    return {
      found,
      message: 'Usuários encontrados',
    };
  }
}
