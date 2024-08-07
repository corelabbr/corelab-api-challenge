import express from "express"
import { PrismaClient } from "@prisma/client"

const app = express()
const port = 3000
const prisma = new PrismaClient()

app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.send("hello world")
})

app.get("/todas", async (req, res) => {
  let todasNotas = await prisma.notas.findMany()
  res.send(todasNotas)
})

app.post("/criar", async (req, res) => {
  let nota = req.body
  await prisma.notas.create({
    data: {
      titulo: nota["titulo"],
      conteudo: nota["conteudo"],
    }
  })
  res.sendStatus(200)
})

app.put("/editar", async (req, res) => {
  let notaId = parseInt(req.query["notaId"])
  let nota = req.body

  await prisma.notas.update({
    where: {
      id: notaId
    }, 
    data: {
      titulo: nota["titulo"],
      conteudo: nota["conteudo"]
    }
  })
  res.sendStatus(200)
})

app.delete("/apagar", async (req, res) => {
  let notaId = parseInt(req.query["notaId"])
  await prisma.notas.delete({
    where: {
      id: notaId
    }
  })
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log("Servidor rodando na porta " + port)
})