'use client'
import AdminProvider from '@/src/components/admin-provider';
import { getServerSession } from 'next-auth/next';
import { options } from '@/lib/auth/options';
import Dashboard from '@/src/components/dashboard';
import { redirect } from 'next/navigation';
import { SessionProvider, useSession } from 'next-auth/react';
import { auth } from '@/src/app/api/auth/[...nextauth]/route';

export default async function ClientLayout({children}: any) {
  // const session = await getServerSession(options);

  // const session = await getServerSession(options)
  //
  // console.log('ClientLayout', session);
  // if (!session) {
  //  redirect('/login')
  // }

  return <SessionProvider session={children.session}>
    <Dashboard>{children}</Dashboard>
  </SessionProvider>
}
