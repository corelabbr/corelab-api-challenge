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

app.listen(port, () => {
  console.log("Servidor rodando na porta " + port)
})