'use client';

import ClientTable from '@/src/components/ClientTable';
import { Roles } from '@/types/types';
import { useSession } from 'next-auth/react';
import NotFound from '@/src/components/defaultPages/not-found';

interface PostsEditProps {
  params: {
    id: string;
  };
}

export default function ClientData({params}: PostsEditProps) {
  const {data: session, status}: {data: any, status: string} = useSession();

  if (!session?.user?.id && status !== 'loading') {
    return <NotFound/>
  }

  return <ClientTable id={params.id} role={Roles.Admin} host={session?.user?.host}/>;
}
