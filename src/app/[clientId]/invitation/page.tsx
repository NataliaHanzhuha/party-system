'use client';

import axios from 'axios';
import useSWR from 'swr';
import Loading from '@/src/components/loading';
import { selectView, ViewType } from '@/src/app/[clientId]/settings';

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

  const getComponentData = {
      client: {
        name: data?.name,
        id: clientId
      }
    };

  return selectView(ViewType.Invitation, data?.invitationPage, getComponentData)
}
