-- CreateTable
CREATE TABLE "RejectionReason" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RejectionReason_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RejectionReason" ADD CONSTRAINT "RejectionReason_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
