import { db } from '@/db';

export async function getUser(email: any) {
  return db.admin.findUnique({where: {email}});
}
