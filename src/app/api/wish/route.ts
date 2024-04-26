import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';

export async function POST(request: NextRequest) {
  const clientId: string | null = request.nextUrl.searchParams.get('clientId');
  const {name, text} = await request.json();

  const guest = await db.wish.create({data: {name, clientId, text}});
  return NextResponse.json(guest);
}

export async function GET(request: NextRequest) {
  const clientId: string | null = request.nextUrl.searchParams.get('clientId')!;

  const wishes = await db.client.findUnique({
    where: {id: clientId},
    select: {
      id: true,
      name: true,
      wishes: true
    }
  });
  return NextResponse.json(wishes ?? []);
}
