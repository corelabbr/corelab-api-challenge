-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "media" TEXT[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
