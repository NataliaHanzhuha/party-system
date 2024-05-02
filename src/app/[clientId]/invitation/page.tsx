'use client';

import axios from 'axios';
import useSWR from 'swr';
import selectComponent from '@/app/[clientId]/invitation/select-view';
import Loading from '@/components/loading';
// import { Metadata } from 'next';

export default function ClientData({params}: any) {
  const {clientId} = params;
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const {data, error, isLoading} = useSWR('/api/client?id=' + clientId, fetcher);

  if (isLoading) {
    return  <Loading />;
  }

  if (!data?.id) {
    return 'no such client';
  }

  return selectComponent(clientId, data);
}
