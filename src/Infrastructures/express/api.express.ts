import { Api } from "../api";
import express, { Express } from "express";
import { Route } from "./routes/route";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();


export class ApiExpress implements Api {
    private app: Express;

    private constructor(
        route: Route[]
    ) {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.addRoutes(route);
    }


    public static create(route: Route[]) {
        return new ApiExpress(route);
    }

    public addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            this.app[method](path, handler);

        })
    }

    public start(port: any): void {
        this.app.listen(port, () => {
            console.log("http://localhost" + ":" + process.env.PORT);
            this.listRoutes();

        });
    }

    private listRoutes() {
        const routes = this.app._router.stack
            .filter((route: any) => route.route)
            .map((route: any) => {
                return {
                    path: route.route.path,
                    method: route.route.stack[0].method
                }
            });

        console.log(routes);
    }

    public getApp(): Express {
        return this.app;
    }
}