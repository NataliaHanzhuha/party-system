'use server';

import axios from 'axios';
import ClientList from '@/app/clients/page';
import useSWR from 'swr';

export async function getData() {
  const res = await axios.get('/api/client');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // if (!res.status !== 200) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }

  return res.data;
}

export default async function Home() {
  // const fetcher = () => axios.get('/api/client').then(res => res.data)
  // const { data, error, isLoading } = useSWR('/api/user/123', fetcher)
  // try {
  // const res = await axios.get('/api/client');
  // data = res.data;
  // console.log(res);

  // } catch (error) {}
  // const clients = await fetchClients();
  // console.log(data);
  return <main>
    {/*{data.length}*/}
    {/*{clients.map((client) =>*/}
    {/*  <Link key={client.id}*/}
    {/*        href={`/clients/${client.id}`}>{client.name}</Link>)}*/}
  </main>;
}
