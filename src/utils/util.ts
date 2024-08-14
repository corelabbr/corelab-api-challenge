import { ICreateTaskDto } from "modules/task/dtos/ICreateTaskDto";

export default function stringToBoolean(str: string | boolean): boolean {
  return str === "true"? true : str === "false" ? false : undefined;
}

export const hasEmptyValues = (obj: ICreateTaskDto) => {
  const { title, taskContent} = obj;
  return Object.values({title, taskContent}).some((value) => value === null || value === undefined || value === "");
};