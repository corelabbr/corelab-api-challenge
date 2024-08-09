import { ICreateTaskDto } from "../dtos/ICreateTaskDto";
import { IFilterSearchDto } from "../dtos/IFilterSearchDto";
import { Task } from "../entities/Task.entity";

interface ITaskRepository {
  save(data: ICreateTaskDto): Promise<Task>;
  findById(id: string): Promise<Task|null|undefined>
  findByTitle(title: string): Promise<Task|null|undefined>
  findAll(filter?: IFilterSearchDto): Promise<Task[]|null|undefined>
  delete(task: Task): Promise<void>
  update(data: Task):Promise<Task>
}
export { ITaskRepository };