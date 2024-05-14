'use client';

import ClientTable from '@/src/components/ClientTable';
import { useSession } from 'next-auth/react';
import { Roles } from '@/types/types';
import NotFound from '@/src/components/defaultPages/not-found';

interface PostsEditProps {
  params: {
    id: string;
  };
}

export default function ClientData({params}: PostsEditProps) {
  const {data: session, status}: {data: any, status: string} = useSession();

  if (!session?.user?.id) {
    console.log(session);
    return <NotFound/>
  }

  return <ClientTable id={session?.user?.id!} role={Roles.Client} host={session?.user?.host}/>;
}
