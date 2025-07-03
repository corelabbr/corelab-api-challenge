export interface Note {
  id: string;
  title: string;
  description: string;
  favorite: boolean;
  createdAt: string;
  updatedAt?: string;
  color?: string;
}
