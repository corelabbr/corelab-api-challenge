export interface Note {
  id: string;
  title: string;
  description: string;
  favorite: boolean;
  color?: string;
  createdAt: string;
  updatedAt?: string;
}
