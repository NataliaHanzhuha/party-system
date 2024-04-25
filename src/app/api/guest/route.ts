import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';

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
