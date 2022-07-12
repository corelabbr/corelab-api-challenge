import express from 'express';
import cors from 'cors';
import routes from './Routes/index'
require('./Database');

export class App {

    private express: express.Application;
    private port = 5000

    constructor(){
        this.express = express();
        this.middlewares();
        this.routes();
        this.listen();
    }


    public getApp(): express.Application {
        return this.express
    }

    private listen():void{
        this.express.listen(this.port, ()=> {
            console.log('Served started at the port ' + this.port)
        })
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }


    private routes():void {
        this.express.use('/vehicle', routes)
    }

}