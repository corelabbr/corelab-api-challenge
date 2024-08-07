-- CreateTable
CREATE TABLE "Notas" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "cor" TEXT NOT NULL DEFAULT 'ffffff',
    "favorito" BOOLEAN NOT NULL DEFAULT false,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notas_pkey" PRIMARY KEY ("id")
);
