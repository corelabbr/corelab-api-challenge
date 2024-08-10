import express from "express"
import { PrismaClient } from "@prisma/client"
import cors from "cors"

const app = express()
const port = 3000
const prisma = new PrismaClient()
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.send("hello world")
})

app.get("/todas", async (req, res) => {
  let todasNotas = await prisma.notas.findMany({
    orderBy: [
      {
        cor: "asc"
      },
      {
        criadaEm: "desc"
      }
    ]
  })
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

app.patch("/favoritar", async (req, res) => {
  let notaId = parseInt(req.query["notaId"])
  let statusFavorito = !!parseInt(req.body["favorito"])
  // O Prisma não aceita 0 ou 1 como boolean, apenas true ou false, então a exclamação dupla (!!) é utilizada para transformar o Int em um Boolean.
  // 0 é utilizado para falso (nota não favoritada), >=1 é utilizado para true (nota favoritada)

  await prisma.notas.update({
    where: {
      id: notaId
    },
    data: {
      favorito: statusFavorito
    }
  })
  res.sendStatus(200)
})

app.patch("/trocar-cor", async (req, res) => {
  let notaId = parseInt(req.query["notaId"])
  let novaCor = req.body["novaCor"]

  await prisma.notas.update({
    where: {
      id: notaId
    },
    data: {
      cor: novaCor
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