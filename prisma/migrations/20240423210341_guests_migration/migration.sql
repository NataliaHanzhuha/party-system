-- CreateEnum
CREATE TYPE "GuestStatus" AS ENUM ('NEW', 'EDITED', 'REGECTED');

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT,
    "extraPerson1" TEXT,
    "status" "GuestStatus" NOT NULL DEFAULT 'NEW',

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
