export interface ITask {
  id: number
  title: string
  description: string
  isFavorite: boolean
  color: string
  createdAt: Date | string
  updatedAt: Date | string
}

export interface ICreateTaskDTO {
  title: string
  description?: string
  isFavorite?: boolean
  color?: string
}

export interface IUpdateTaskDTO {
  title?: string
  description?: string
  isFavorite?: boolean
  color?: string
}

export interface IErrorResponse {
  message: string
  details?: any
}
