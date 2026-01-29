import { MongoRepository, Repository } from "typeorm";
import { ITaskRepository } from "../ITaskRepository";
import { Task } from "modules/task/entities/Task.entity";
import { ICreateTaskDto } from "modules/task/dtos/ICreateTaskDto";
import { ObjectId } from "mongodb";
import { IFilterSearchDto } from "modules/task/dtos/IFilterSearchDto";
import { AppDataSource } from "config/typeorm";

class TaskRepository implements ITaskRepository {
  private repository: MongoRepository<Task>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(Task);
  }

  async save(data: ICreateTaskDto): Promise<Task> {
    const task = this.repository.create(data);
    return await this.repository.save(task);
  }
  
  async update(data: Task): Promise<Task |null | undefined> {
    const updatedTask = await this.repository.findOneAndUpdate(
      {_id: data._id},
      {$set: data},
      { returnDocument:  "after" }
    )

    return updatedTask.value;
  }

  async findById(id: string): Promise<Task | null | undefined> {
    const task = await this.repository.findOne({
      where: {_id: new ObjectId(id)}
    })

    return task;
  }

  async findAll(filter?: IFilterSearchDto): Promise<Task[] | null | undefined> {

    const {title, isFavorite} = filter;

    const matchConditions: any = {};

    if(title) {
      matchConditions.title =  { $regex: `.*${title}.*`, $options: 'i' }
    }
    
    if(typeof isFavorite === "boolean") {
      matchConditions.isFavorite = isFavorite;
    } 

    return await this.repository.find( matchConditions );
  }

  async findByTitle(title: string): Promise<Task | null | undefined> {
    const task = await this.repository.findOne({where: {title}})
    return task;
  }

  async delete(task: Task): Promise<void> {
    await this.repository.delete(task)
  }

}

export { TaskRepository }
