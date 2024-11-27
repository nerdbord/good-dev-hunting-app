-- CreateEnum
CREATE TYPE "CvDocumentType" AS ENUM ('PDF', 'DOCX');

-- CreateTable
CREATE TABLE "CvDocument" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CvDocumentType" NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "CvDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CvDocument_profileId_key" ON "CvDocument"("profileId");

-- AddForeignKey
ALTER TABLE "CvDocument" ADD CONSTRAINT "CvDocument_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
