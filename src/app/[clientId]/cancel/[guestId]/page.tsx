'use client';
import axios from 'axios';
import useSWR from 'swr';
import Loading from '../../../../components/loading';
import selectComponent from '@/app/[clientId]/cancel/select-view';

export default function DefaultInvitation({params}: any) {
  const {clientId, guestId} = params;
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const {data, error, isLoading} = useSWR('/api/guest?id=' + guestId + '&clientId=' + clientId, fetcher);

  if (isLoading) {
    return  <Loading />;
  }

  if (!data?.id) {
    return 'no such client';
  }

  return selectComponent(data);
}
