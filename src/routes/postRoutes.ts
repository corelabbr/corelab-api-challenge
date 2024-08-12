import { Request, Response, Router } from "express";
import path from 'path';
import multer from 'multer';

// Models
import { Post } from "../models/Post";

// Services and Repositories
import { postRepository } from "../repositories/postRepository";
import { postService } from "../services/postService";

const router = Router();

const repositoryPost = new postRepository();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { statusCode, body } = await new postService(repositoryPost).getPost();
    res.status(statusCode).json(body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const data: Pick<Post, "color" | "favorite" | "text" | "title" | "id"|"media"> = req.body

    const requiredFields: (keyof Pick<Post, "color" | "favorite" | "title">)[] = ["color", "favorite", "title"]
    for(const field of requiredFields) {
      if (typeof data[field] === 'undefined' || (typeof data[field] === 'string' && !data[field].trim())) {
        return res.status(400).json(`The field ${field} is required.`);
      }
    }
      
      const { statusCode, body } = await new postService(repositoryPost).addPost(data)
      res.status(statusCode).json(body)
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try{
    const {id} = req.params;
    const data = req.body;
    const { statusCode, body } = await new postService(repositoryPost).updatePost(id, data);
    res.status(statusCode).json(body);

  }catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  const { statusCode, body } = await new postService(repositoryPost).deletePost(id)
  res.status(statusCode).json(body);
})

export default router;


