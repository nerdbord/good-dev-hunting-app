/*
  Warnings:

  - You are about to drop the column `isPublished` on the `Profile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PublishingState" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "isPublished",
ADD COLUMN     "state" "PublishingState" NOT NULL DEFAULT 'DRAFT';
