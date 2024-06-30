import { db } from '@/src/db';
import { NextRequest, NextResponse } from 'next/server';
import { Client, Guest } from '@prisma/client';

export async function GET(request: NextRequest) {
  const id: string | null = request.nextUrl.searchParams.get('id');
  const name: string | null = request.nextUrl.searchParams.get('name');

  const include = {
    guests: true,
    wishes: true,
  }

  if (id) {
    const client = await db.client.findUnique({
      where: {id}, include});

    if (!client) {
      return NextResponse.json('No client with id: ' + id, {status: 404});
    }

    return NextResponse.json(client);
  } else if (name) {
    const client = await db.client
      .findFirst({where: {name}, include});

    if (!client) {
      return NextResponse.error();
    }

    return NextResponse.json(client);
  } else {
    const clients = await db.client.findMany();
    return NextResponse.json(clients ?? []);
  }

}

export async function PUT(request: NextRequest) {
  const id: string | null = request.nextUrl.searchParams.get('id');
  const {name, email, invitationPage, EmailTemplateDetailsId, EmailTemplateDetails}: any = await request.json();
  let templateId = EmailTemplateDetailsId;

  // if (EmailTemplateDetails.mediaEmailId?.trim()?.length
  //   || EmailTemplateDetails.invitationEmailId?.trim().length) {
  //   if (EmailTemplateDetailsId) {
  //     await db.emailTemplateDetails.update({
  //         where: {Client: {'id': {in: [id!]}}},
  //         data: {...EmailTemplateDetails}});
  //   } else {
  //     const tmpl = await db.emailTemplateDetails.create({data: {...EmailTemplateDetails}});
  //     templateId = tmpl.id;
  //   }
  // }

  const client = await db.client.update({
    where: {id: id!},
    data: {name, email, invitationPage},
  });

  return NextResponse.json(client);
}

export async function PATCH(request: NextRequest) {
  const {name, email, invitationPage}: any = await request.json();

  const client = await db.client.create({
    data: {name, email, invitationPage}
  });

  return NextResponse.json(client);
}
