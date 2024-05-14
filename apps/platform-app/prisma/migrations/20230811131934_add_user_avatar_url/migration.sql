/*
  Warnings:

  - You are about to drop the column `image` on the `GitHubDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GitHubDetails" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT;
