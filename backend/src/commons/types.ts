export interface RequestParams {
    id: string;
}
  
export interface RequestBody {
  name: string;
  description: string;
  favorite?: boolean;
  color?: string;
}

export interface FavoriteRequestBody {
    favorite: boolean;
}

export interface FindAllQueryParams {
  name?: string;
  color?: string;
  search?: string;
}