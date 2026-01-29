import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects, ZodError } from 'zod';

export const validate =
  <T extends Record<string, unknown>>(schema: AnyZodObject | ZodEffects<any>) =>
  async (
    req: Request<unknown, unknown, unknown, T>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: err.issues });
      }
    }
  };