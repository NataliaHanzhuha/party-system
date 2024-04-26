'use client'
import { auth, signOut } from '@/app/auth';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export async function Home() {
  return <main className="flex flex-col gap-3">
    <h1>Protected</h1>
    {/*<a href="/login">sign out</a>*/}
    {/*<a href="/">public route</a>*/}
  </main>;
}
