-- CreateTable
CREATE TABLE "Vehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false
);
