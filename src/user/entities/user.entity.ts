import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as argon2 from 'argon2';
import { TaskEntity } from './../../task/entities/task.entity';
import { Length, MinLength } from 'class-validator';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Unique(['username'])
  @Length(6)
  username: string;

  @Column({ nullable: false })
  @Length(6)
  password: string;

  @Column({ nullable: false })
  @MinLength(6)
  @Unique(['email'])
  email: string;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
