// 'use client';

import LoginForm from '@/src/app/login/page';
import { getServerSession } from 'next-auth/next';
import { options } from '@/lib/auth/options';
import { redirect } from 'next/navigation';
import { auth } from './api/auth/[...nextauth]/route';

export default async function Page({}) {
  // const session = await getServerSession(options);

  // console.log(session);
  // if (session) {
  //   redirect('clients');
  // } else {
  //   redirect('/login')
  // }

  return <main>
    {/*<LoginForm />*/}
  </main>;
}
