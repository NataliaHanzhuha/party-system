const { PrismaClient }  = require( '@prisma/client');
const prisma = new PrismaClient()
async function main() {
  const config = await prisma.emailTemplateDetails.create({
    // where: {id: 1},
    data: {
      mediaEmailId :     '',
      invitationEmailId: '',
    }
  });
  const alice = await prisma.client.upsert({
    where: {id: 'clvjuxirn0001qqn4tjwgoknv'},
    update: {},
    create: {
      name: 'test',
      email: 'nataliiahanzhuha@gmail.com',
      invitationPage: 'DEFAULT',
      EmailTemplateDetailsId: 1
    }
  });
  console.log(config, alice);
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
