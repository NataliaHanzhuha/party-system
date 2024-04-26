import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { Guest } from '@prisma/client';

export async function GET(request: NextRequest) {
  const id: string | null = request.nextUrl.searchParams.get('id');
  const clientId: string | null = request.nextUrl.searchParams.get('clientId');

  if (id) {
    const client = await db.guest.findUnique({
      where: {id, clientId},
      include: {
        client: true
      }
    });

    if (!client) {
      return NextResponse.error();
    }

    return NextResponse.json(client);
  } else {
    const clients = await db.guest.findMany();
    return NextResponse.json(clients ?? []);
  }
}

export async function POST(request: NextRequest) {
  const clientId: string | null = request.nextUrl.searchParams.get('clientId');
  const {name, email, extraPerson1} = await request.json();
  console.log(clientId, name);

  const isExistGuest: any | null = db.guest.findFirst({where: {email}});

  if (isExistGuest && isExistGuest.status === 'REJECTED') {
    await db.guest.delete({where: {email, id: isExistGuest.id}});
  }

  const guest = await db.guest.create({
    data: {name, clientId, email, extraPerson1, status: 'NEW'},
  });
  return NextResponse.json(guest);
}

export async function PATCH(request: NextRequest) {
  const id: string = request.nextUrl.searchParams.get('id')!;
  const clientId: string | null = request.nextUrl.searchParams.get('clientId')!;

  const {name, extraPerson1}: Guest = await request.json();

  const guest = await db.guest.update({
    where: {id, clientId},
    data: {name, extraPerson1, status: 'EDITED'},
  });

  return NextResponse.json(guest);
}

export async function PUT(request: NextRequest) {
  const id: string = request.nextUrl.searchParams.get('id')!;
  const clientId: string = request.nextUrl.searchParams.get('clientId')!;
  console.log('put guest');
  const guest = await db.guest.update({
    where: {id, clientId},
    data: { status: 'REJECTED'},
  });
  return NextResponse.json(guest);
}
