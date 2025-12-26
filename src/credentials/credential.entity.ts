import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from 'src/users/user.entity';

@Entity({ name: 'credentials' })
@Unique(['credentialableId'])
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'credentialable_id' })
  credentialableId: number;

  @OneToOne(() => User, (user) => user.credential, { nullable: true })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
