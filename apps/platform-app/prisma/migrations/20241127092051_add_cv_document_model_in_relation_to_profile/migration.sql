/*
  Warnings:

  - A unique constraint covering the columns `[cvDocumentId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CvDocumentType" AS ENUM ('PDF', 'DOCX');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "cvDocumentId" TEXT;

-- CreateTable
CREATE TABLE "CvDocument" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CvDocumentType" NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CvDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_cvDocumentId_key" ON "Profile"("cvDocumentId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_cvDocumentId_fkey" FOREIGN KEY ("cvDocumentId") REFERENCES "CvDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;
