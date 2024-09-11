import path from 'path';
import fs from 'fs';

import { PrismaClient } from '@prisma/client';
import { IClient } from '@/types/types';
import { log } from 'node:util';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.development.local' });
const prisma = new PrismaClient(
  {
    datasources: {
      db: {
        url: process.env.POSTGRES_PRISMA_URL,
      },
    },
  }
);

const arr = ['client', 'guest', 'admin', 'emailTemplateDetails', 'wish'];

async function dbData(name: string, data: any) {
  switch (name) {
    case 'client': {
      const newData = {
        name: data?.name,
        email: data?.email,
        invitationPage: data?.invitationPage,
        settings: data?.settings ?? {},
      };

      return prisma.client.upsert({
        where: { id: data?.id },
        update: newData,
        create: {id: data?.id, ...newData},
      });
    }
    case 'admin': {
      const newData = {
        name: data?.name,
        email: data?.email,
        hash: data?.hash
      };

      return prisma.admin.upsert({
        where: { id: data?.id },
        update: newData,
        create: {id: data?.id, ...newData},
      });
    }
    case 'guest': {
      const newData = {
        name: data?.name,
        email: data?.email,
        createdAt: data?.createdAt,
        clientId: data?.clientId,
        extraPerson1: data?.extraPerson1 ?? null,
        status: data?.status ?? 'NEW',
        sendMedia: data?.sendMedia
      };

      return prisma.guest.upsert({
        where: { id: data?.id },
        update: newData,
        create: {id: data?.id, ...newData},
      });
    }
    case 'emailTemplateDetails': {
      const newData = {
        mediaEmailId: data?.mediaEmailId,
        invitationEmailId: data?.invitationEmailId,
      };
      return prisma.emailTemplateDetails.upsert({
        where: { id: data?.id },
        update: newData,
        create: {id: data?.id, ...newData},
      });
    }
    case 'wish': {
      const newData = {
        createdAt: data?.createdAt,
        text: data?.text,
        name: data?.name,
        clientId: data?.clientId,
      };

      return prisma.wish.upsert({
        where: { id: data.id },
        update: newData,
        create: {id: data?.id, ...newData},
      });
    }
  }
}

async function main() {
  for (const name of arr) {
    const filePath = path.join(process.cwd(), 'localDB', name + '.json');

    // Read the data from the file
    const data = fs.readFileSync(filePath, 'utf8');

    // Parse the data to JSON
    const users = JSON.parse(data);

    for (const user of users) {
      await dbData(name, user).then(() => console.log('seeded ' + name))
        .catch(e => console.log(e))
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
