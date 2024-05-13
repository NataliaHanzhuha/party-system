'use client';

import ClientTable from '@/src/components/ClientTable';
import { useSession } from 'next-auth/react';
import { Roles } from '@/types/types';

interface PostsEditProps {
  params: {
    id: string;
  };
}

export default function ClientData({params}: PostsEditProps) {
  const {data: session}: {data: any} = useSession();

  if (!session?.client?.id) {
    return 'empty'
  }

  return <ClientTable id={session?.client?.id!} role={Roles.Client}/>;
}
