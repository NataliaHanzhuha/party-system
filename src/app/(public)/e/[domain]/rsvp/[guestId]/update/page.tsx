'use client';

import InvitationPage from '@/src/app/(public)/e/[domain]/(components)/(rsvp)/InvitationPage';
import useSWR from 'swr';
import { fetcher, swrOptions } from '@/lib/auth/session';
import { useClientContext } from '@/src/app/(public)/e/[domain]/(layout)/MediaManagerLayout';
import Loading from '@/src/app/(public)/e/[domain]/loading';

export default function RSVPPage({params}: any) {
  const client: any = useClientContext();
  const {guestId} = params;
  const {data: guest, error, isLoading} = useSWR('/api/guest?id=' + guestId + '&clientId=' + client.id, fetcher, swrOptions);

  if (isLoading) {
    return <Loading />
  }

  return <InvitationPage domain={params.domain} data={guest}/>;
}
