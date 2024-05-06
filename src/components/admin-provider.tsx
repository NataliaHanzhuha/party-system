'use client';

import Validate from '@/lib/auth/validate';
import { SessionProvider } from 'next-auth/react';

export default function AdminProvider({session, children}: any) {
  return (
    <SessionProvider session={children.session}>
        {children}
    </SessionProvider>
  );
}
