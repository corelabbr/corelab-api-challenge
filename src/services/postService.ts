import { Post} from "@prisma/client";
import { HttpResponse } from "../interfaces/interfaces";
import { postRepository } from "../repositories/postRepository";

export class postService implements postService {

    constructor(
        private readonly postRepository: postRepository
      ) {}

  async getPost(): Promise<HttpResponse<Post[]>>{
    try {
      const posts = await this.postRepository.getPost();
      if(!posts) return {
        statusCode: 404,
        body: "Post not found."
      }
      
      return {
        statusCode: 200,
        body: posts
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`
      }
    }
  }
  
  

  async addPost(
    data: Post
  ): Promise<HttpResponse<Omit<Post, "color" | "favorite" | "text" | "title" |"media">>> {
    try {
      
      await this.postRepository.createPost(data)

      return {
        statusCode: 201,
        body: "Post created successfully.",
      };
    } catch (error) {
      return {
        statusCode: 500,  
        body: `Error: ${error}`,
      };
    }
  }

  async deletePost(id:string):Promise<HttpResponse<Omit<Post,"id">>>{
    try {
      const postExists = await this.postRepository.getUserId(id);
      if (!postExists)
        return {
          statusCode: 404,
          body: "Post not found.",
        };
        
      await this.postRepository.deletePost(id);

      return {
        statusCode: 200,
        body: "Post deleted successfully.",
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }

  async updatePost(
    id:string,
    dataUser: Post
  ): Promise<HttpResponse<Omit<Post,"color" | "favorite" | "text" | "title" |"id"|"media">>> {
    try {
      const onuExists = await this.postRepository.getUserId(id);
      if(!onuExists)     return {
        statusCode: 400,
        body: "Post no exists.",
      };
      
      const fields: (keyof Pick<
        Post,
        "color" | "favorite" | "text" | "title" | "id" | "media"
    >)[] = ["color", "favorite", "text", "title", "id", "media"];
    
    for (const field of fields) {

        if (dataUser[field] === undefined || dataUser[field] === null) {
            dataUser[field] = onuExists[field] as never;
        }
    }

      await this.postRepository.updatePost(id, dataUser);

      return {
        statusCode: 200,
        body: "Post updated successfully.",
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }
}