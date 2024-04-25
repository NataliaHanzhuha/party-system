-- CreateTable
CREATE TABLE "Wish" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "clientId" TEXT,

    CONSTRAINT "Wish_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wish" ADD CONSTRAINT "Wish_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
