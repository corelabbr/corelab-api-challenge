import { Post } from "@prisma/client"
import { HttpResponse } from "./interfaces";

export interface PostRepository {
  getPost: () => Promise<Post[]>;
  createPost: (data:Post) => Promise<string>;
  deletePost: (id:String) => Promise<string>;
  updatePost:(id:string, data:Post) => Promise<string>;
}

export interface PostService {
  getPost: () => Promise<HttpResponse<Post[]>>;
  createPost: (data:Post) => Promise<HttpResponse<string>>;
  deletePost: (id:string) => Promise<HttpResponse<string>>;
  updatePost:(id:string, data:Post) => Promise<HttpResponse<string>>;
}

