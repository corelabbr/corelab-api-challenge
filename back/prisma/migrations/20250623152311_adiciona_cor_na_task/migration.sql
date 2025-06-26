/*
  Warnings:

  - Added the required column `cor` to the `Tarefa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tarefa" ADD COLUMN     "cor" TEXT NOT NULL;
