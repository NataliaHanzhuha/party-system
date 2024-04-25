'use client';

import axios from 'axios';
import useSWR from 'swr';
import selectComponent from '@/app/[clientId]/invitation/select-view';

export default function ClientData({params}: any) {
  const {clientId} = params;
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const {data, error, isLoading} = useSWR('/api/client?id=' + clientId, fetcher);

  if (isLoading) {
    return 'loading...';
  }

  if (!data?.id) {
    return 'no such client';
  }

  return selectComponent(clientId, data);
}
