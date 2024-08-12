import { ObjectId } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
class Task {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column({type: 'text'})
    title!: string;

    @Column({type: 'text'})
    taskContent!: string;

    @Column({type: 'boolean'})
    isFavorite!: boolean;
    
    @Column({type: 'timestamp'})
    createdAt: Date;

    @Column({type: 'timestamp'})
    updatedAt: Date;

}

export { Task };