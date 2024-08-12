import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class postRepository {
  async getPost(): Promise<Post[]> {
    try {
      return await prisma.post.findMany();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  
  async getUserId(id: string): Promise<Post | null> {
    try {
      return await prisma.post.findUnique({
        where: {
          id: parseInt(id),
        },
      });
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }

  async createPost({ title, text, favorite, color, media}: Pick<Post, "color" | "favorite" | "text" | "title" | "media">): Promise<Post> {
    try {
      return await prisma.post.create({
        data: {
         title,
         text,
         favorite,
         color,
         media
        },
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async updatePost(id: string, { title, text, favorite, color, media }: Post): Promise<Post | null> {
    return await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        text,
        favorite,
        color,
        media
      }
    })
  }

  async deletePost(id: string): Promise<Post | null> {
    return await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    })
  }

}