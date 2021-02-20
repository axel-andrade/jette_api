import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3308,
  username: 'root',
  password: 'root',
  database: 'jette',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
