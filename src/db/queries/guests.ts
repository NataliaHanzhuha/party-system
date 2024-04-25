import type { Guest } from '@prisma/client' // Importing the Post type from the Prisma client library.
import { db } from '@/db'
import { notFound } from 'next/navigation' // Importing the notFound function from Next.js for handling 404 errors.

export async function getAllGuestsOfClient(clientId: string): Promise<Guest[]> {
  return db.guest.findMany({where: {clientId}});
}

export async function getGuestById(id: any): Promise<Guest> {
  // @ts-ignore
  return db.guest.findFirst({where: {id}})
}

