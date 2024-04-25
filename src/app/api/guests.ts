import { db } from '@/db';
import { $Enums, Guest } from '@prisma/client';
import GuestStatus = $Enums.GuestStatus;
import type { NextApiRequest, NextApiResponse } from 'next'
export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {name, email, clientId, extraPerson1}: Guest = req.body;
    const isExistGuest: any | null = db.guest.findFirst({where: {email}});

    if (isExistGuest && isExistGuest.status === GuestStatus.REJECTED) {
      await db.guest.delete({where: {email, id: isExistGuest.id}});
    }

    const guest = await db.guest.create({
      data: {name, clientId, email, extraPerson1, status: GuestStatus.NEW},
    });
    res.status(201).json(guest);
  } else if (req.method === 'PATCH') {
    // for editing data
    const {name, clientId, extraPerson1, id}: Guest = req.body;

    const guest = await db.guest.update({
      where: {id, clientId},
      data: {name, clientId, extraPerson1, status: GuestStatus.EDITED},
    });
    res.status(201).json(guest);
  } else if (req.method === 'PUT') {
    // for rejection
    const { clientId, id}: Guest = req.body;
    const guest = await db.guest.update({
      where: {id, clientId},
      data: {clientId, status: GuestStatus.REJECTED},
    });
    res.status(201).json(guest);
  } else if (req.method === 'GET') {
    const guests = await db.guest.findMany(
      {where: {clientId: String(req.query.clientId)}});
    res.status(200).json(guests);
  } else {
    res.status(405).json({message: 'Method Not Allowed'});
  }
}

export async function getGuestById(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const guest = await db.guest.findUnique({
      where: {id: String(req.query.id)},
    });
    if (!guest) {
      return res.status(404).json({message: 'Guest not found'});
    }
    res.status(200).json(guest);
  } else {
    res.status(405).json({message: 'Method Not Allowed'});
  }
}
