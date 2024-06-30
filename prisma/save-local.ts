import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function dbData(name: string) {
  switch (name) {
    case 'client': {
      return prisma.client.findMany();
    }
    case 'admin': {
      return prisma.admin.findMany();
    }
    case 'guest': {
      return prisma.guest.findMany();
    }
    case 'emailTemplateDetails': {
      return prisma.emailTemplateDetails.findMany();
    }
    case 'wish': {
      return prisma.wish.findMany();
    }
  }
}

async function saveDBLocal(dbName: string) {
  // try {
  const users = await dbData(dbName);

  // Convert the data to JSON
  const data = JSON.stringify(users, null, 2);

  // Define the file path
  const filePath = path.join(process.cwd(), 'localDB', dbName + '.json');

  // Write the data to a file
  fs.writeFileSync(filePath, data);
}

async function main() {
  const arr = ['client', 'guest', 'admin', 'emailTemplateDetails', 'wish'];

  for (const name of arr) {
    await saveDBLocal(name);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
