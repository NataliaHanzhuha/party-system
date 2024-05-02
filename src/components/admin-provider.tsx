'use client';

import Validate from '@/lib/auth/validate';
import { SessionProvider } from 'next-auth/react';

interface AdminProvider {
  session: any;
  children: React.ReactNode;
}

export default function AdminProvider({session, children}: AdminProvider) {
  return (
    <SessionProvider session={session}>
      <Validate>
        {children}
      </Validate>
    </SessionProvider>
  );
}
