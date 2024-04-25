/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Guest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "invitationEmailId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Guest_email_key" ON "Guest"("email");
