'use client';

import useSWR from 'swr';
import { selectView, ViewType } from '@/src/app/(public)/[clientId]/settings';
import { fetcher, swrOptions } from '@/lib/auth/session';

export default function ClientData({params}: any) {
  const {clientId} = params;
  const {data, error, isLoading} = useSWR('/api/client?id=' + clientId, fetcher, swrOptions);
  const getComponentData = {client: {name: data?.name, id: clientId}};
  const {page, loading, error: errorPage} = selectView(ViewType.Invitation, data?.invitationPage, getComponentData);

  if (isLoading) {
    return loading;
  }

  if (!data?.id || error) {
    return errorPage;
  }

  return page;
}
