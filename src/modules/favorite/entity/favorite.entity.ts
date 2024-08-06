import { User } from '../../../modules/user/entity/user.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Note } from '../../note/entity/note.entity';

@Entity()
class Favorites {
  /* Constructor for unit tests */
  constructor(user_id: number, note_id: number) {
    this.user_id = user_id;
    this.note_id = note_id;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.deleted_at = null;
  }

  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  note_id: number;

  @ManyToOne(() => User, (user) => user.id_user)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Note, (note) => note.id_note)
  @JoinColumn({ name: 'course_id' })
  note: Note;

  @DeleteDateColumn({
    nullable: true,
  })
  deleted_at: string;

  @CreateDateColumn({
    nullable: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    nullable: false,
  })
  updated_at: Date;
}

export { Favorites as Favorite };