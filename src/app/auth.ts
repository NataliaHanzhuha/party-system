import NextAuth, { Session } from 'next-auth';
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import { db } from '@/db';
import { isSamePass, saltAndHashPassword } from '@/utills/password';
import prisma from '../../lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: any) => {
        let user: any = null

        // logic to salt and hash password
        const pwHash = saltAndHashPassword(credentials.password)

        // logic to verify if user exists
        user = await prisma.admin.findUnique({where: {email: credentials.email}})

        if (!user) {
          // No user found, so this is their first attempt to log in
          // meaning this is also the place you could do registration
          // throw new Error("User not found.")
          return null;
        }

        if (!await isSamePass(credentials.password, user.hash)) {
          // throw new Error("Wrong password.")
          return null;

        }

        // return user object with the profile data
        return user
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString()
      return baseUrl
    },
    async session({ session, token, user }: any) {
      if (token) {
        session.id = token.id
      }
      return session
    },
  }
})
