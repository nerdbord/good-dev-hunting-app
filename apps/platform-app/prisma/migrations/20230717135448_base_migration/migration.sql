/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `GitHubDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "GitHubDetails" ADD COLUMN     "image" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "GitHubDetails_username_key" ON "GitHubDetails"("username");
