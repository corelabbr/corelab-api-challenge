interface Todo {
  id: string;
  name: string;
  description?: string;
  color: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

type CreateTodo = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

type UpdateTodo = Partial<Omit<Todo, 'id'>> & { id: string };

export type { Todo, CreateTodo, UpdateTodo };


function isTodo(obj: unknown): obj is Todo {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    (obj.description === undefined || typeof obj.description === 'string') &&
    typeof obj.color === 'string' &&
    typeof obj.favorite === 'boolean' &&
    typeof obj.createdAt === 'string' &&
    typeof obj.updatedAt === 'string'
  );
}

export { isTodo };