'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Page() {
  // const {data: session, update, status}: {data: any, update: Function, status: string} = useSession();
  //
  // useEffect(() => {
  //   console.log(session.client);
  //   if (session?.client?.id) {
  //     redirect('/celebrant/dashboard');
  //   } else {
  //     redirect('/celebrant/login');
  //   }
  // }, [session?.client]);

  return <>
  </>
}
