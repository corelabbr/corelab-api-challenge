import { Request, Response } from 'express'

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export const HttpMethod = {
    GET: 'get' as HttpMethod,
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
} as const;

export interface Route {
    getHandler(): (req: Request, res: Response) => Promise<void>
    getPath(): string;
    getMethod(): HttpMethod;
    isProtected(): boolean;
}