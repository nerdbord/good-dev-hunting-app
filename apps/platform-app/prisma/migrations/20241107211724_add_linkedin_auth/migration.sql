-- CreateTable
CREATE TABLE "LinkedInDetails" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LinkedInDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkedInDetails_username_key" ON "LinkedInDetails"("username");

-- CreateIndex
CREATE UNIQUE INDEX "LinkedInDetails_userId_key" ON "LinkedInDetails"("userId");

-- AddForeignKey
ALTER TABLE "LinkedInDetails" ADD CONSTRAINT "LinkedInDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
