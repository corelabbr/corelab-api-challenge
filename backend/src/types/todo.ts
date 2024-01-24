export interface TodoRequest {
  id?: string;
  title: string;
  description: string;
  completed: boolean | string;
  color?: string;
  favorite: boolean | string;
}
