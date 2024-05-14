import { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { handleError } from '../utils';
import prisma from '@/lib/prisma';
import { isSamePass, saltAndHashPassword } from '@/src/utills/password';
// import { randomBytes, randomUUID } from 'node:crypto';
import { Roles } from '@/types/types';

const userParams = (user: any): any => {
  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role,
    name: `${user.first_name} ${!!user?.last_name ? user?.last_name : ''}`.trim(),
    host: process.env.NEXTAUTH_URL
  };
};

const adminCredentials = CredentialsProvider({
  id: 'admin',
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
    try {
      const {email, password} = credentials as {
        email: string
        password: string
      };

      let user: any = null;
      const pwHash = saltAndHashPassword(password);

      user = await prisma.admin.findUnique({where: {email}});

      if (!user) {
        return null;
      }

      const checkPassword = await isSamePass(password, user.hash);

      if (!checkPassword) {
      //   // throw new Error("Wrong password.")
        return null;
      }

      return {
        id: user.id,
        first_name: user.name,
        email: user.email,
        role: Roles.Admin
      } as any;
    } catch (error: any) {
      handleError(error);
      return null;
    }
  },
});
const clientCredentials = CredentialsProvider({
  id: 'client',
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
    try {
      const {email, password} = credentials as {
        email: string
        password: string
      };

      const client = await prisma.client.findFirst({where: {email}});

      if (!client) {
        return null;
      }

      console.log({...client, role: Roles.Client});
      return {
        id: client?.id,
        email: client?.email,
        first_name: client?.name,
        role: Roles.Client,
      } as any;
    } catch (error: any) {
      handleError(error);
      return null;
    }
  },
});

export const options: NextAuthOptions = {
  providers: [
    adminCredentials,
    clientCredentials
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    // generateSessionToken: () => {
    //   return randomUUID?.() ?? randomBytes(32).toString('hex');
    // }
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(params): Promise<any> {
      return params;
    },
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
          // client: userParams(user),
          error: null,
        };
      } else if (Date.now() < (token.expires_at ?? 0)) {
        return {...token, error: null};
      } else {
        // try {
        //   // const api = directus();
        //   // const result: AuthRefresh = await api.request(
        //   //   refresh('json', user?.refresh_token ?? token?.refresh_token ?? '')
        //   // );
        //   return {
        //     ...token,
        //     access_token: result.access_token ?? '',
        //     expires_at: Math.floor(Date.now() + (result.expires ?? 0)),
        //     refresh_token: result.refresh_token ?? '',
        //     error: null,
        //     tokenIsRefreshed: true,
        //   };
        // } catch (error) {
        return {...token, error: 'RefreshAccessTokenError' as const};
        // }
      }
    },
    async session({session, token}: { session: Session, token: any }): Promise<any> {
      if (token.error) {
        session.error = token.error;
        session.user = token.user as any;
        // session.user = token?.user?.role === Roles.Admin ? token.user as any : null;
        // session.client = token?.user?.role === Roles.Client ? token.user : null;
        session.expires = new Date(
          new Date().setDate(new Date().getDate() - 1)
        ).toISOString();
      } else {
        // const {id, name, email, role} = token.user as any;
        session.access_token = token.access_token;
        session.tokenIsRefreshed = token?.tokenIsRefreshed ?? false;
        session.expires_at = token.expires_at;
        session.refresh_token = token.refresh_token;
        // session.user = role === Roles.Admin ? {id, name, email} as any : null;
        // session.client = role === Roles.Client ? token.user : null;
        session.user = token.user as any;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
};
