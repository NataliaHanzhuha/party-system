'use client';

import axios from 'axios';
import useSWR from 'swr';
import Loading from '@/src/components/loading';
import { selectView, ViewType } from '@/src/app/[clientId]/settings';

export default function InvitationUpdate({params}: any) {
  const {clientId, guestId} = params;
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const {data, error, isLoading} = useSWR('/api/guest?id=' + guestId + '&clientId=' + clientId, fetcher);

  if (isLoading) {
    return <Loading/>;
  }

  if (!data?.id) {
    return 'no such client';
  }

  return selectView(ViewType.Invitation, data?.client?.invitationPage, data)
}
