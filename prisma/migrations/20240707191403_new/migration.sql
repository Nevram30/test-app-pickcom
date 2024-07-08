/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT', 'AGENCY');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('WEB', 'MOBILE', 'DESKTOP');

-- CreateEnum
CREATE TYPE "ProjectStage" AS ENUM ('PLANNING', 'DESIGN', 'DEVELOPMENT', 'TESTING', 'DEPLOYMENT');

-- CreateEnum
CREATE TYPE "IndustryType" AS ENUM ('IT', 'FINANCE', 'HEALTHCARE', 'EDUCATION', 'RETAIL', 'MANUFACTURING', 'OTHER');

-- CreateEnum
CREATE TYPE "ServiceTypes" AS ENUM ('WEB_DESIGN', 'WEB_DEVELOPMENT', 'MOBILE_DESIGN', 'MOBILE_DEVELOPMENT', 'DESKTOP_DESIGN', 'DESKTOP_DEVELOPMENT');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "User_name_idx";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "role" "Role" NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "projectType" (
    "id" TEXT NOT NULL,
    "name" "ProjectType" NOT NULL,
    "projectTypeId" TEXT NOT NULL,

    CONSTRAINT "projectType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectStage" (
    "id" TEXT NOT NULL,
    "name" "ProjectStage" NOT NULL,
    "projectStageId" TEXT NOT NULL,

    CONSTRAINT "projectStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PickedProject" (
    "id" SERIAL NOT NULL,
    "projectPostsId" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "PickedProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PickedAgency" (
    "id" SERIAL NOT NULL,
    "agenciesPotsId" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "PickedAgency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientPost" (
    "id" TEXT NOT NULL,
    "project_title" VARCHAR(255) NOT NULL,
    "project_description" VARCHAR(255) NOT NULL,
    "user_id" TEXT NOT NULL,
    "projectTypeId" TEXT NOT NULL,
    "projectStageId" TEXT NOT NULL,

    CONSTRAINT "ClientPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgencyPost" (
    "id" TEXT NOT NULL,
    "agency_name" VARCHAR(255),
    "agency_description" VARCHAR(255) NOT NULL,
    "phone_number" TEXT NOT NULL,
    "website_url" TEXT NOT NULL,
    "industry_type" "IndustryType"[],
    "size" INTEGER NOT NULL,
    "foundedYear" INTEGER NOT NULL,
    "serviceTypesId" "ServiceTypes"[],
    "user_id" TEXT NOT NULL,

    CONSTRAINT "AgencyPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "agencyPostId" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "projectType_name_idx" ON "projectType"("name");

-- CreateIndex
CREATE INDEX "projectStage_name_idx" ON "projectStage"("name");

-- CreateIndex
CREATE INDEX "PickedProject_user_id_idx" ON "PickedProject"("user_id");

-- CreateIndex
CREATE INDEX "PickedProject_projectPostsId_idx" ON "PickedProject"("projectPostsId");

-- CreateIndex
CREATE INDEX "PickedAgency_user_id_idx" ON "PickedAgency"("user_id");

-- CreateIndex
CREATE INDEX "ClientPost_user_id_idx" ON "ClientPost"("user_id");

-- CreateIndex
CREATE INDEX "ClientPost_projectTypeId_idx" ON "ClientPost"("projectTypeId");

-- CreateIndex
CREATE INDEX "ClientPost_projectStageId_idx" ON "ClientPost"("projectStageId");

-- CreateIndex
CREATE INDEX "AgencyPost_user_id_idx" ON "AgencyPost"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_user_id_key" ON "Address"("user_id");

-- CreateIndex
CREATE INDEX "Address_user_id_idx" ON "Address"("user_id");

-- CreateIndex
CREATE INDEX "Address_agencyPostId_idx" ON "Address"("agencyPostId");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- AddForeignKey
ALTER TABLE "PickedProject" ADD CONSTRAINT "PickedProject_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickedProject" ADD CONSTRAINT "PickedProject_projectPostsId_fkey" FOREIGN KEY ("projectPostsId") REFERENCES "ClientPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickedAgency" ADD CONSTRAINT "PickedAgency_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickedAgency" ADD CONSTRAINT "PickedAgency_agenciesPotsId_fkey" FOREIGN KEY ("agenciesPotsId") REFERENCES "AgencyPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientPost" ADD CONSTRAINT "ClientPost_projectTypeId_fkey" FOREIGN KEY ("projectTypeId") REFERENCES "projectType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientPost" ADD CONSTRAINT "ClientPost_projectStageId_fkey" FOREIGN KEY ("projectStageId") REFERENCES "projectStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientPost" ADD CONSTRAINT "ClientPost_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyPost" ADD CONSTRAINT "AgencyPost_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_agencyPostId_fkey" FOREIGN KEY ("agencyPostId") REFERENCES "AgencyPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;
