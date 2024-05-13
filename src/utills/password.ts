import bcrypt from 'bcryptjs';

export async function saltAndHashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function isSamePass(unHashedPass: string, hash: string) {
  return bcrypt.compare(unHashedPass, hash);
}
