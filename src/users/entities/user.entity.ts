import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

import { UserRole } from '../enums/user-roles.enum';

@Entity('users')
@Unique(['email', 'cpf', 'phoneNumber'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 11 })
  cpf: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;
  
  @Column({ name: 'last_name', nullable: false, type: 'varchar', length: 200 })
  lastName: string;

  @Column({ name: 'phone_number', nullable: false, type: 'varchar' })
  phoneNumber: string;

  @Column({ name: 'profile_image', nullable: true, type: 'varchar' })
  profileImage: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  role: UserRole;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  confirmationToken: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  recoverToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
