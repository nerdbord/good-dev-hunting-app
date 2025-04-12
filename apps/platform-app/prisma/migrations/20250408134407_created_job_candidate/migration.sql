-- CreateTable
CREATE TABLE "JobCandidate" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "matchScore" INTEGER NOT NULL,
    "technicalSkillsScore" INTEGER NOT NULL,
    "experienceLevelScore" INTEGER NOT NULL,
    "employmentPreferencesScore" INTEGER NOT NULL,
    "additionalFactorsScore" INTEGER NOT NULL,
    "matchReason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobCandidate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JobCandidate_jobId_idx" ON "JobCandidate"("jobId");

-- CreateIndex
CREATE INDEX "JobCandidate_profileId_idx" ON "JobCandidate"("profileId");

-- CreateIndex
CREATE INDEX "JobCandidate_matchScore_idx" ON "JobCandidate"("matchScore");

-- CreateIndex
CREATE UNIQUE INDEX "JobCandidate_jobId_profileId_key" ON "JobCandidate"("jobId", "profileId");

-- AddForeignKey
ALTER TABLE "JobCandidate" ADD CONSTRAINT "JobCandidate_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobCandidate" ADD CONSTRAINT "JobCandidate_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
