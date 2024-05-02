import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/db';
import { excelDoc } from '@/src/utills/excel-processing';
import { sendEmailWithGuestsList } from '@/src/utills/sendGrid';

export async function GET(request: NextRequest) {
  const id: string = request.nextUrl.searchParams.get('id')!;

  const client = await db.client.findUnique({
    where: {id},
    include: {guests: true}
  });

  if (!client) {
    return NextResponse.error();
  }

  const filePath = await excelDoc(client?.guests, client);
  return await sendEmailWithGuestsList(client, filePath);
}
