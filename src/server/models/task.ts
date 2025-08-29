export interface Task {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  favorite: boolean;
  color?: string;
}
