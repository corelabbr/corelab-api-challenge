import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
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