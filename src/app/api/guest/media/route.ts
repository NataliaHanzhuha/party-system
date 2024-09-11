import { NextRequest, NextResponse } from 'next/server';
import { Guest } from '@prisma/client';
import { db } from '@/src/db';

export async function PATCH(request: NextRequest) {
  const clientId: string | null = request.nextUrl.searchParams.get('clientId')!;
  const {name, email}: Guest = await request.json();

  const findGuest = await db.guest.findMany({where: {email, clientId}});

  let guest;

  if (findGuest?.length) {
    guest = await db.guest.update({
      where: {id: findGuest[0]?.id},
      data: {name, email, sendMedia: true, status: 'EDITED'}
    });
  } else {
    guest = await db.guest.create({
      data: {name, clientId, email, extraPerson1: null, status: 'NEW', sendMedia: true},
    });
  }

  return NextResponse.json(guest);
}
