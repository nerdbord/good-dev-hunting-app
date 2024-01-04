/*
  Warnings:

  - A unique constraint covering the columns `[nerdbordUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nerdbordUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_nerdbordUserId_key" ON "User"("nerdbordUserId");
