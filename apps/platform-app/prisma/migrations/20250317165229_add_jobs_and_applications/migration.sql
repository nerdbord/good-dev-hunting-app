-- AlterTable
ALTER TABLE "Technology" ADD COLUMN     "jobId" TEXT;

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "jobName" TEXT NOT NULL,
    "projectBrief" TEXT NOT NULL,
    "budgetType" TEXT NOT NULL,
    "currency" "Currency",
    "minBudgetForProjectRealisation" INTEGER,
    "maxBudgetForProjectRealisation" INTEGER,
    "contractType" TEXT NOT NULL,
    "employmentTypes" TEXT[],
    "employmentModes" TEXT[],
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "remoteOnly" BOOLEAN NOT NULL DEFAULT false,
    "state" "PublishingState" NOT NULL DEFAULT 'DRAFT',
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "terms" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "jobOwnerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(3),

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Technology" ADD CONSTRAINT "Technology_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobOwnerId_fkey" FOREIGN KEY ("jobOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
