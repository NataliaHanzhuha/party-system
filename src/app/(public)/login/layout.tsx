'use client';

import { SessionProvider } from 'next-auth/react';

export default function LoginLayout({children}: any) {
  return <SessionProvider session={children.session}>{children}</SessionProvider>;

}
