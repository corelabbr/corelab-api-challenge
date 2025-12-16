import mongoose from "mongoose"
import { Todo, TodoDocument } from "src/business/models/TodoModel";

export const todoMock: Todo = {
  title: 'Teste',
  description: 'teste descricao'
}

export const todoMock2:Todo = {
  ...todoMock,
  isFavorite: true,
  color: '#f94242'
}

export const todoMockDocument = {
  ...todoMock2,
  _id: new mongoose.Types.ObjectId('66b3fc446865ce584627f7cd'),
} as TodoDocument
