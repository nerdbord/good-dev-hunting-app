-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "linkedIn" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "remoteOnly" BOOLEAN NOT NULL,
    "position" TEXT NOT NULL,
    "seniority" TEXT NOT NULL,
    "techStack" TEXT[],
    "employmentType" "EmploymentType" NOT NULL,
    "isPublished" BOOLEAN NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitHubDetails" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GitHubDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "openForRelocation" BOOLEAN NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "openForRelocation" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "GitHubDetails_userId_key" ON "GitHubDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Country_id_key" ON "Country"("id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GitHubDetails" ADD CONSTRAINT "GitHubDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
