-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "color" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);
