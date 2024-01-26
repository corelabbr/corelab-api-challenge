"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./routers/router");
const app = (0, express_1.default)();
const port = process.env.Port || 5080;
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.json());
app.use(router_1.router);
app.listen(port, async () => console.log(`Aplicação iniciada na porta ${port}!`));
