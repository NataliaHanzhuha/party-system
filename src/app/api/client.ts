import { db } from '@/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, invitationEmailId } = req.body;
    const client = await prisma.client.create({
      data: {name, email, invitationEmailId},
    });
    res.status(201).json(client);
  } else if (req.method === 'GET') {
    if (req.query.id) {
      const client = await db.client.findUnique(
        {where: { id: String(req.query.id) },});
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }
      res.status(200).json(client);
    }
    const clients = await db.client.findMany();
    res.status(200).json(clients);
  } else {
    res.status(405).json({ message: 'Method Not Allowed!!!' });
  }
}

// export async function getClientById(req, res) {
//   if (req.method === 'GET') {
//     const id = req.params.id;
//     const client = await prisma.client.findUnique(
//       {
//         where: { id },
//         include: {
//           guests: true,
//           wishes: true
//         }
//       });
//     if (!client) {
//       return null; // res.status(404).json({ message: 'Client not found' });
//     }
//
//     return client; //res.status(200).json(client);
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }
