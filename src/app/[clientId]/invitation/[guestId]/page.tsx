'use client';

import useSWR from 'swr';
import { selectView, ViewType } from '@/src/app/[clientId]/settings';
import { fetcher, swrOptions } from '@/lib/auth/session';

export default function InvitationUpdate({params}: any) {
  const {clientId, guestId} = params;
  const {data, error, isLoading} = useSWR('/api/guest?id=' + guestId + '&clientId=' + clientId, fetcher, swrOptions);
  const {page, loading, error: errorPage} = selectView(ViewType.Invitation, data?.client?.invitationPage, data);

  if (isLoading) {
    return loading;
  }

  if (!data?.id || error) {
    return errorPage;
  }

  return page;
}
