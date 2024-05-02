import AdminProvider from '@/src/components/admin-provider';
import { getServerSession } from 'next-auth/next';
import { options } from '@/lib/auth/options';
import Dashboard from '@/src/components/dashboard';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default async function ClientLayout({children}: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  console.log(session);
  // if (!session) {
  //  redirect('/')
  // }

  return <AdminProvider session={session}>
    <Dashboard>{children}</Dashboard>
  </AdminProvider>;
}
