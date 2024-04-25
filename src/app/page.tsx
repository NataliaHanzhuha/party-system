'use server';

import axios from 'axios';
import ClientList from '@/app/clients/page';
import useSWR from 'swr';

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
