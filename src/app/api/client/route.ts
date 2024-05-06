import { db } from '@/src/db';
import { NextRequest, NextResponse } from 'next/server';
import { Client, Guest } from '@prisma/client';

export async function GET(request: NextRequest) {
  const id: string | null = request.nextUrl.searchParams.get('id');
  console.log(id);

  if (id) {
    const client = await db.client.findUnique({
      where: {id},
      include: {
        guests: true,
        wishes: true,
        EmailTemplateDetails: true
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

export async function PUT(request: NextRequest) {
  const id: string | null = request.nextUrl.searchParams.get('id');
  const {name, email, invitationPage, EmailTemplateDetailsId, EmailTemplateDetails}: any = await request.json();
  console.log(id, name);
  let templateId = EmailTemplateDetailsId;

  if (EmailTemplateDetails.mediaEmailId?.trim()?.length
    || EmailTemplateDetails.invitationEmailId?.trim().length) {
    if (EmailTemplateDetailsId) {
      await db.emailTemplateDetails.update({
          where: {Client: {id: {in: [id!]}}},
          data: {...EmailTemplateDetails}});
    } else {
      const tmpl = await db.emailTemplateDetails.create({data: {...EmailTemplateDetails}});
      templateId = tmpl.id;
    }
  }

  const client = await db.client.update({
    where: {id: id!},
    data: {name, email, invitationPage, EmailTemplateDetailsId: templateId},
  });

  return NextResponse.json(client);
}
