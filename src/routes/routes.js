const express = require("express");
const tarefaController = require("../controllers/tarefaController");
const router = express.Router();


 router.get("/", tarefaController.listar);
 router.post("/", tarefaController.create);
 router.get("/:id", tarefaController.ler);
 router.put("/:id", tarefaController.update);
 router.delete("/:id", tarefaController.delete);
 


module.exports=router;