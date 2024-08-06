import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class Users {
    /* Constructor for unit tests */
    constructor(
      id_user: number,
      username: string,
      email: string,
      password: string,
    ) {
      this.id_user = id_user;
      this.username = username;
      this.email = email;
      this.password = password;
      this.created_at = new Date();
      this.updated_at = new Date();
      this.deleted_at = null;
    }

  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({
    unique: true,
    length: 35,
  })
  username: string;

  @Column({
    unique: true,
    length: 50,
  })
  email: string;

  @Column({
    length: 500,
  })
  password: string;

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

export { Users as User };