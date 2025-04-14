import { CreateTodo, UpdateTodo } from '../types/todo.d';

const formatItem = (item: CreateTodo | UpdateTodo) => {
    return{
      ...item,
      color: typeof item.color === 'string' && item.color.startsWith('#')
        ?item.color.substring(1)
        :item.color,
    }
};

export default formatItem;