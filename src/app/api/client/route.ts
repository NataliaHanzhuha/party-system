import { db } from '@/src/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const id: string | null = request.nextUrl.searchParams.get('id');
  console.log(id);

  if (id) {
    const client = await db.client.findUnique({
      where: {id},
      include: {
        guests: true,
        wishes: true,
        // invitationPage: true
      }
    });

    if (!client) {
      return NextResponse.error();
    }

    return NextResponse.json(client);
  } else {
    const clients = await db.client.findMany();
    console.log(clients);
    return NextResponse.json(clients ?? []);
  }

}
