import { NextRequest } from 'next/server';
import { db } from '@/src/db';
import { sendEmailToManyGuests } from '@/src/utills/sendGrid';

export async function GET(request: NextRequest) {
  const clientId: string | null = request.nextUrl.searchParams.get('clientId')!;
  console.log(clientId);
  const client: any = await db.client.findUnique(
    {
      where: {id: clientId},
      include: {guests: true}
    });

  console.log(client);
  return await sendEmailToManyGuests(client);
}
