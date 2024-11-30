/*
  Warnings:

  - You are about to drop the `CvDocument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CvDocument" DROP CONSTRAINT "CvDocument_profileId_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "cvUrl" TEXT;

-- DropTable
DROP TABLE "CvDocument";

-- DropEnum
DROP TYPE "CvDocumentType";
