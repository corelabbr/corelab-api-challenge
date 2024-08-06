import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { User } from '../../user/entity/user.entity';
  
  export enum Color {
    LIGHT_BLUE = 'lightblue',
    TURQUOISE = 'turquoise',
    YELLOW = 'yellow',
    SALMON = 'salmon',
    RED = 'red',
    BLUE = 'blue',
    VIOLET = 'violet',
    LIME = 'lime',
    ORANGE = 'orange',
    GRAY = 'gray',
    DARK_GRAY = 'darkgray',
    BROWN = 'brown',
  }

  @Entity()
  class Notes {
    @PrimaryGeneratedColumn()
    id_note: number;
  
    @Column({
      length: 35,
    })
    title: string;

    @Column({
        nullable: false,
        type: process.env.DB_ENGINE === 'mysql' ? 'longtext' : 'text',
      })
    note_text: string;

    @ManyToOne(() => User, (user) => user.id_user, {
      nullable: false,
    })
    @JoinColumn({ name: 'user_id' })
    @Column({
      nullable: false,
    })
    user_id: number;

    @Column({
      name: 'color',
      type: 'enum',
      enum: [Color.LIGHT_BLUE, Color.TURQUOISE, Color.YELLOW, Color.SALMON, Color.RED, Color.BLUE, Color.VIOLET, Color.LIME, Color.ORANGE, Color.GRAY, Color.DARK_GRAY, Color.BROWN], 
    })
    color: string
  
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
  
  export { Notes as Note };