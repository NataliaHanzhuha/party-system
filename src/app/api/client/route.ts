import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { name, email, invitationEmailId } = req.body;
//     const client = await prisma.client.create({
//       data: {name, email, invitationEmailId},
//     });
//     res.status(201).json(client);
//   } else if (req.method === 'GET') {
//     if (req.query.id) {
//       const client = await db.client.findUnique(
//         {where: { id: String(req.query.id) },});
//       if (!client) {
//         return res.status(404).json({ message: 'Client not found' });
//       }
//       res.status(200).json(client);
//     }
//     const clients = await db.client.findMany();
//     res.status(200).json(clients);
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }
export async function GET(request: NextRequest) {
  const id: string | null = request.nextUrl.searchParams.get('id');

  if (id) {
    const client = await db.client.findUnique({
      where: {id},
      include: {
        guests: true,
        wishes: true
      }
    });

    if (!client) {
      return NextResponse.error();
    }

    return NextResponse.json(client);
  } else {
    const clients = await db.client.findMany();
    return NextResponse.json(clients ?? []);
  }

}
