import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'task_title' })
  taskTitle: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'due_date', nullable: true })
  dueDate: Date;

  @Column({ name: 'is_favorite', default: false })
  isFavorite: boolean;

  @Column({ name: 'is_completed', default: false })
  isCompleted: boolean;

  @Column({ nullable: true })
  color: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
