'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import LoginForm from '@/src/app/login/page';

export default function Page() {
  // useEffect(() => {
  //   redirect('/clients');
  // })

  return <main>
    <LoginForm />
  </main>;
}
