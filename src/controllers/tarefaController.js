const mysql = require("../db/db.js")



const tarefaController={
 //criar listar imagem
 listar: async (req, res) => {

  try {
    const response=await mysql.execute( ` SELECT *from  tarefa`)
    return res.status(200).send(response)
  } catch (error) {
    return res.status(500).json({ error:error.sqlMessage });
  }

  },
  ler: async (req, res) => {
    try {
      const {id}=req.params
      const response=await mysql.execute( ` SELECT *from  tarefa WHERE id=?`,[id])
     if(response.length==0){
      return res.status(404).send({
        message: `Tarefa não encontrada`
      });
     }
      return res.status(200).send(response)
    } catch (error) {
      return res.status(500).json({ error:error.sqlMessage });
    }
 
  },
  create: async (req, res) => {
  
       try {
        const { titulo,descricao } = req.body;
        if(!titulo || !descricao){
          return res.status(400).json({ error: 'Titulo e descrição são obrigatórios' });
         }
const tarefa =await mysql.execute("SELECT * FROM tarefa WHERE titulo=?",[titulo]);
if (tarefa.length > 0) {
  return res.status(409).send({
    message: `Tarefa com esse ${titulo} já cadastrada`,
  });
} 
await mysql.execute(
        "INSERT INTO tarefa(titulo, descricao) VALUES (?,?) ",
        [titulo, descricao]
      );
   
   return res.status(201).json({message: 'Tarefa cadastrada com sucesso'});
  
  } catch (error) {
    return res.status(500).json({ error:error.sqlMessage })
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao} = req.body;
    if (!titulo || !descricao) {
      return res.status(400).json({ error: 'Titulo e descrição são obrigatórios' });
    }
    try {
     const response=await mysql.execute( ` SELECT *from  tarefa WHERE id=?`,[id])
     if(response.length==0){
      return res.status(404).send({
        message: `Tarefa não encontrada`
      });
     }
     await mysql.execute(
`UPDATE tarefa SET titulo=? , descricao=?  WHERE id=?`,
      [titulo, descricao,id]
    );
  return res.status(200).json({message: 'Tarefa atualizada com sucesso'});
    } catch (error) {
      return res.status(500).json({ error:error.sqlMessage });
    }
  },
  delete:async (req, res) => {
      const { id } = req.params;
      try {
        const response=await mysql.execute( ` SELECT *from  tarefa WHERE id=?`,[id])
        if(response.length==0){
         return res.status(404).send({
           message: `Tarefa não encontrada`
         });
        }
              await mysql.execute("DELETE FROM tarefa WHERE id=?", [id]);
        return res.status(200).send({ message: "Deletado com sucesso " });
      } catch (err) {
        return res.status(400).send(err);
      }
    },

}
module.exports=tarefaController;