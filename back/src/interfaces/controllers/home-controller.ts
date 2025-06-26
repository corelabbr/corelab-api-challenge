import { Request, Response } from "express";

export class HomeController { 
    static async welcome(req: Request, res: Response) {
        try {
            res.status(200).json({ 
                success: true,
                message: "Bem Vindo",
                version: "1.0.0",
                timestamp: new Date().toISOString(),
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Internal server error.",
                error: error.message,
            });
        }
    }
  }

