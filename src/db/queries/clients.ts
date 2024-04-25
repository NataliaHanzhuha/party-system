import type { Client } from '@prisma/client' // Importing the Post type from the Prisma client library.
import { db } from '@/db'
import { notFound } from 'next/navigation' // Importing the notFound function from Next.js for handling 404 errors.

export async function fetchClients(): Promise<Client[]> {
  return db.client.findMany();
}

export async function fetchClientByID(id: string): Promise<Client | null> {
  const client = db.client.findFirst({
    where: {id},
    include: {
      guests: true,
      wishes: true
    }
  });

  if (!client) {
    notFound();
  }

  return client;
}
