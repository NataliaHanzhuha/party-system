import { db } from '@/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { text, name, clientId } = req.body;
    const wish = await db.wish.create({
      data: {text, name, clientId},
    });
    res.status(201).json(wish);
  } else if (req.method === 'PATCH') {
    const { text, name, clientId, id } = req.body;
    const wish = await db.wish.update({
      where: {id, clientId},
      data: {text, name, clientId},
    });
    res.status(201).json(wish);
  } else if (req.method === 'GET') {
    const wishes = await db.wish.findMany(
      {where: {clientId: String(req.query.clientId)}});
    res.status(200).json(wishes);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export async function getWishById(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const wish = await db.wish.findUnique({
      where: { id: String(req.query.id) },
    });
    if (!wish) {
      return res.status(404).json({ message: 'Wish not found' });
    }
    res.status(200).json(wish);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
