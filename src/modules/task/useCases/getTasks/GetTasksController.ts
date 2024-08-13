import { Request, Response } from 'express';
import { IFilterSearchDto } from 'modules/task/dtos/IFilterSearchDto';
import { ITaskRepository } from 'modules/task/repositories/ITaskRepository';
import { container } from "tsyringe";
import { GetTasksService } from './GetTasksService';
import stringToBoolean from 'utils/util';


class GetTasksController {

  async handle(request: Request, response: Response): Promise<Response> {
    const {title, isFavorite} = request.query as IFilterSearchDto;

    const getTasksService = container.resolve(GetTasksService);
    const tasks = await getTasksService.execute({title, isFavorite: stringToBoolean(isFavorite)});
    return response.status(200).send(tasks);

  }
}

export {GetTasksController};