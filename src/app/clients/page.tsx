'use client';
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';

export default function ClientList() {
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const {data, error, isLoading} = useSWR('/api/client', fetcher);

  if (isLoading) {
    return 'loading...';
  }

  if (!data?.length) {
    return 'no clients yet';
  }

  return <>
    {data?.map((client: any) =>
      <Link key={client.id}
            href={`/clients/${client.id}`}>{client.name}</Link>)}
  </>;
}
