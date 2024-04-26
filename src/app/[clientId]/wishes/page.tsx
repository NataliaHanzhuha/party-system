'use client'
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import Loading from '@/components/loading';
import selectComponent from '@/app/[clientId]/wishes/select-view';

export default function WishForm({params}: any) {
  const {clientId} = params;
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const {data, error, isLoading} = useSWR('/api/client?id=' + clientId, fetcher);

  if (isLoading) {
    return  <Loading />;
  }

  if (!data?.id) {
    return 'no such client';
  }

  return selectComponent(data);
}
