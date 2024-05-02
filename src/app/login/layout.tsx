import { SessionProvider, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import LoginForm from '@/src/app/login/page';

export default function LoginLayout({children}: any) {
  const { data: session, update } = useSession();

  console.log(session);
  if (session) {
    redirect('/clients');
  }

  return <SessionProvider>
    <LoginForm update={(res: any) => {
      console.log('layout', res);
      update(res)}}/>
  </SessionProvider>
}
