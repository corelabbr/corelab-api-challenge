require('dotenv').config();
const express = require("express")
const cors =require("cors")
const port= 3000;
const app=express();
const morgan= require("morgan");


 const router = require("./src/routes/routes.js");

app.use(express.json())
app.use(cors());
app.use(morgan("dev"))
app.use(router);




 

app.listen(port,()=>{
    console.log("Servidor rodando na http://localhost:" + port);
    
})