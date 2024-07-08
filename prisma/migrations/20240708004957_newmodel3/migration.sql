/*
  Warnings:

  - You are about to drop the column `agenciesPotsId` on the `PickedAgency` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `PickedAgency` table. All the data in the column will be lost.
  - You are about to drop the column `projectPostsId` on the `PickedProject` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `PickedProject` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[agencyPostId,clientId]` on the table `PickedAgency` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientPostId,agencyId]` on the table `PickedProject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `agencyPostId` to the `PickedAgency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `PickedAgency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agencyId` to the `PickedProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientPostId` to the `PickedProject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PickedAgency" DROP CONSTRAINT "PickedAgency_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PickedProject" DROP CONSTRAINT "PickedProject_user_id_fkey";

-- AlterTable
ALTER TABLE "PickedAgency" DROP COLUMN "agenciesPotsId",
DROP COLUMN "user_id",
ADD COLUMN     "agencyPostId" TEXT NOT NULL,
ADD COLUMN     "clientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PickedProject" DROP COLUMN "projectPostsId",
DROP COLUMN "user_id",
ADD COLUMN     "agencyId" TEXT NOT NULL,
ADD COLUMN     "clientPostId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PickedAgency_agencyPostId_clientId_key" ON "PickedAgency"("agencyPostId", "clientId");

-- CreateIndex
CREATE UNIQUE INDEX "PickedProject_clientPostId_agencyId_key" ON "PickedProject"("clientPostId", "agencyId");

-- AddForeignKey
ALTER TABLE "PickedProject" ADD CONSTRAINT "PickedProject_clientPostId_fkey" FOREIGN KEY ("clientPostId") REFERENCES "ClientPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickedProject" ADD CONSTRAINT "PickedProject_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickedAgency" ADD CONSTRAINT "PickedAgency_agencyPostId_fkey" FOREIGN KEY ("agencyPostId") REFERENCES "AgencyPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PickedAgency" ADD CONSTRAINT "PickedAgency_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
