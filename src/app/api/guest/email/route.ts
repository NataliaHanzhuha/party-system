import { NextRequest } from 'next/server';
import { db } from '@/src/db';
import { sendNewGuestEvent } from '@/src/utills/sendGrid';

export async function GET(request: NextRequest) {
  const id: string | null = request.nextUrl.searchParams.get('id')!;
  const clientId: string | null = request.nextUrl.searchParams.get('clientId')!;

  const guest: any = await db.guest.findUnique({
    where: {id, clientId}
  })
  const client: any = await db.client.findUnique(
    {where: {id: clientId}});
  console.log('POST', client, guest);
  return await sendNewGuestEvent(client, guest);
}
