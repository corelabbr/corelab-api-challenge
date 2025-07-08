import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: number;

  @Column({ default: false })
  favorite: boolean;

  @Column({ type: 'varchar', length: 7, nullable: true })
  color?: string;
}
