'use client';

import { SessionProvider } from 'next-auth/react';

export default function AdminProvider({children}: any) {
  return (
    <SessionProvider session={children.session}>
        {children}
    </SessionProvider>
  );
}
