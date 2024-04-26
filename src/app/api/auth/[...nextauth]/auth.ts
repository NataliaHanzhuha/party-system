import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { isSamePass } from '@/utills/password';
import prisma from '../../../../../lib/prisma';

export const {handlers, auth} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: any) => {
        let user: any = null;

        user = await prisma.admin.findUnique({where: {email: credentials.email}});

        if (!user) {
          return null;
        }

        if (!await isSamePass(credentials.password, user.hash)) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async redirect({url, baseUrl}) {
      if (url.startsWith(baseUrl)) {
        return url;
      } else if (url.startsWith('/')) {
        return new URL(url, baseUrl).toString();
      }
      return baseUrl;
    },
    async session({session, token, user}: any) {
      if (token) {
        session.id = token.id;
      }
      return session
    },
  }
})
