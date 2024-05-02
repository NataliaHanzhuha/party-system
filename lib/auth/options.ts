import { Awaitable, NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { directus, login } from '@/src/utills/directus';
import { readMe, refresh } from '@directus/sdk';
import { JWT } from 'next-auth/jwt';
import { AuthRefresh, UserParams, UserSession } from '@/types/next-auth';
import { handleError } from '../utils';
import prisma from '@/lib/prisma';
import { isSamePass, saltAndHashPassword } from '@/src/utills/password';
import { randomBytes, randomUUID } from 'node:crypto';

const userParams = (user: UserSession): UserParams => {
  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    name: `${user.first_name} ${user.last_name}`,
  };
};

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      authorize: async function(credentials) {
        console.log(credentials);
        try {
          const {email, password} = credentials as {
            email: string
            password: string
          };

          let user: any = null
          const pwHash = saltAndHashPassword(password)

          user = await prisma.admin.findUnique({where: {email, hash: pwHash as any}})

          if (!user) {
            return null;
          }

          const checkPassword = await isSamePass(password, user.hash)
          console.log(user, checkPassword, pwHash);
          if (!checkPassword) {
            // throw new Error("Wrong password.")
            return null;
          }

          return user;
        } catch (error: any) {
          handleError(error);
          console.error(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({token, account, user, trigger, session}): Promise<JWT> {
      if (trigger === 'update' && !session?.tokenIsRefreshed) {
        token.access_token = session.access_token;
        token.refresh_token = session.refresh_token;
        token.expires_at = session.expires_at;
        token.tokenIsRefreshed = false;
      }

      if (account) {
        return {
          access_token: user.access_token,
          expires_at: user.expires,
          refresh_token: user.refresh_token,
          user: userParams(user),
          error: null,
        };
        } else if (Date.now() < (token.expires_at ?? 0)) {
          return { ...token, error: null }
      } else {
        try {
          const api = directus()
          const result: AuthRefresh = await api.request(
            refresh("json", user?.refresh_token ?? token?.refresh_token ?? "")
          )
          return {
            ...token,
            access_token: result.access_token ?? "",
            expires_at: Math.floor(Date.now() + (result.expires ?? 0)),
            refresh_token: result.refresh_token ?? "",
            error: null,
            tokenIsRefreshed: true,
          }
        } catch (error) {
          return { ...token, error: "RefreshAccessTokenError" as const }
        }
      }
    },
    async session({session, token}): Promise<Session> {
      console.log('session', session);
      if (token.error) {
        session.error = token.error;
        session.expires = new Date(
          new Date().setDate(new Date().getDate() - 1)
        ).toISOString();
      } else {
        const {id, name, email} = token.user as UserParams;
        session.user = {id, name, email} as any;
        session.access_token = token.access_token;
        session.tokenIsRefreshed = token?.tokenIsRefreshed ?? false;
        session.expires_at = token.expires_at;
        session.refresh_token = token.refresh_token;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
};
