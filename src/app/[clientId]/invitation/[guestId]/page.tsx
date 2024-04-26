'use client';

import axios from 'axios';
import useSWR from 'swr';
import JulietInvitation from '@/components/JulietPage/juliet-invitation';
import DefaultInvitation from '@/components/default-form';
import { Guest } from '@prisma/client';
import selectComponent from '@/app/[clientId]/invitation/select-view';
import Loading from '@/components/loading';

export default function InvitationUpdate({params}: any) {
  const {clientId, guestId} = params;
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const {data, error, isLoading} = useSWR('/api/guest?id=' + guestId + '&clientId=' + clientId, fetcher);

  if (isLoading) {
    return  <Loading />;
  }

  if (!data?.id) {
    return 'no such client';
  }


return selectComponent(clientId, data, guestId);
}
