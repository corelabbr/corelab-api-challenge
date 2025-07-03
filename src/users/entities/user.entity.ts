import { Note } from 'src/notes/entities/note.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'USER' })
  role: 'USER' | 'ADMIN';

  @CreateDateColumn()
  createdDate: Date;

  @OneToMany(() => Note, (note) => note.user)
  listNotes: Note[];
}
