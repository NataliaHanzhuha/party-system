import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { Guest } from '@prisma/client';
import { sendNewGuestEvent } from '@/src/utills/sendGrid';
import { PagesViews } from '@/src/app/(public)/e/[domain]/(settings)/constant';

export async function GET(request: NextRequest) {
  const id: string | null = request.nextUrl.searchParams.get('id');
  const clientId: string | null = request.nextUrl.searchParams.get('clientId');

  if (id) {
    const guest = await db.guest.findUnique({
      where: {id, clientId},
      include: {
        client: true
      }
    });

    if (!guest) {
      return NextResponse.json('No guest with id: ' + id, {status: 404});
    }

    return NextResponse.json(guest);
  } else {
    const guests = await db.guest.findMany();
    return NextResponse.json(guests ?? []);
  }
}

export async function POST(request: NextRequest) {
  const clientId: string = request.nextUrl.searchParams.get('clientId')!;
  const type: string = request.nextUrl.searchParams.get('type')!;
  const {name, email, extraPerson1} = await request.json();
  const client: any = await db.client.findUnique({where: {id: clientId}});
  const isExistGuest: any | null = await db.guest.findFirst({where: {email}});

  console.log(clientId, name, email);
  if (isExistGuest?.id) {
    if (isExistGuest.status === 'REJECTED') {
      await db.guest.delete({where: {email, id: isExistGuest.id}});

      const guest = await db.guest.create({
        data: {name, clientId, email, extraPerson1, status: 'NEW'},
      });

      if (!guest) {
        return NextResponse.error();
      }

      return await sendNewGuestEvent(client, guest as Guest);
    } else {
      const guest = await db.guest.update({
        where: {id: isExistGuest?.id, clientId},
        data: {name, email, extraPerson1, status: 'EDITED'},
      });

      if (!guest) {
        return NextResponse.error();
      }


      if (type === PagesViews.MEDIA_MANAGEMENT) {
        return NextResponse.json({message: 'Guest saved'});
        // templateId = client.settings[PagesViews.MEDIA_MANAGEMENT];
      }

      // let templateId: string | null = null;
      //
      // if (type === PagesViews.RSVP) {
      //   templateId = client.settings[PagesViews.RSVP]?.templateId;
      // }

      return await sendNewGuestEvent(client, guest as Guest);
    }
  }

  const guest = await db.guest.create({
    data: {name, clientId, email, extraPerson1, status: 'NEW'},
  });

  return await sendNewGuestEvent(client, guest);
  // return NextResponse.json(guest);
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
    data: {status: 'REJECTED'},
  });
  return NextResponse.json(guest);
}

export async function DELETE(request: NextRequest) {
  const id: string = request.nextUrl.searchParams.get('id')!;

  const guest = await db.guest.delete({
    where: {id}
  });

  return NextResponse.json(guest);
}
