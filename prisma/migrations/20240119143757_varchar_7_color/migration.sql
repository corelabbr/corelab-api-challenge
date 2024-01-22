/*
  Warnings:

  - You are about to alter the column `color` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(7)`.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "color" SET DATA TYPE VARCHAR(7);
