import { ObjectId } from "mongodb"
import { Task } from "../entities/Task.entity"

class ResponseTaskDto {
  _id: ObjectId;

  title: string;

  taskContent: string;

  isFavorite: boolean;
  
  constructor(task: Task) {
    this._id = task._id
    this.title = task.title
    this.taskContent = task.taskContent
    this.isFavorite = task.isFavorite

  }

}

export { ResponseTaskDto }