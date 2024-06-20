'use client';

import useSWR from 'swr';
import { selectView, ViewType } from '@/src/app/(public)/[clientId]/settings';
import { fetcher, swrOptions } from '@/lib/auth/session';

export default function WishForm({params}: any) {
  const {clientId} = params;
  const {data, error, isLoading} = useSWR('/api/client?id=' + clientId, fetcher, swrOptions);
  const {page, loading, error: errorPage} = selectView(ViewType.Wish, data?.invitationPage, data);

  if (isLoading) {
    return loading;
  }

  if (!data?.id || error) {
    return errorPage;
  }

  return page;
}
