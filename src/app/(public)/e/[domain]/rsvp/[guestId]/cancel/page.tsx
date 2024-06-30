'use client';

import { useClientContext } from '@/src/app/(public)/e/[domain]/(layout)/MediaManagerLayout';
import useSWR from 'swr';
import { fetcher, swrOptions } from '@/lib/auth/session';
import { Guest } from '@prisma/client';
import axios from 'axios';
import { useState } from 'react';
import { cancelFinal, firstForm, positiveCancelAnswer } from '@/src/app/(public)/e/[domain]/(components)/(rsvp)/elements';
import styles from '@/src/app/(public)/e/[domain]/(styles)/rsvp.module.css';
import { usePermition } from '@/src/app/(public)/e/[domain]/(hooks)/usePermition';
import { PagesViews } from '@/src/app/(public)/e/[domain]/(settings)/constant';
import useTheme from '@/src/app/(public)/e/[domain]/(hooks)/useTheme';
import Loading from '@/src/app/(public)/e/[domain]/loading';

export default function RSVPPage({params}: any) {
  const client: any = useClientContext();
  let permission: any = usePermition(PagesViews.RSVP, client.settings);
  const theme = useTheme(permission.mode);
  const {guestId} = params;
  const [agreedForRSVP, isAgreed] = useState<boolean | null>(null);
  const {data: guest, error, isLoading} = useSWR('/api/guest?id=' + guestId + '&clientId=' + client.id, fetcher, swrOptions);

  const cancelGuest = async (data: Guest) => {
    const guest = await axios.put(
      '/api/guest?id=' + data?.id + '&clientId=' + client.id, null);

    isAgreed(!!Object.keys(guest)?.length);
  };

  const message = `Are you sure you want to cancel your Reservation?`;
  const firstFormView = agreedForRSVP === null
    ? firstForm(message, () => cancelGuest(guest), () => isAgreed(false))
    : agreedForRSVP
      ? positiveCancelAnswer
      : cancelFinal;

  if (isLoading) {
    return <Loading />
  }

  return <div className={`${styles.page} ${theme}`}
              style={{backgroundImage: `url(${permission.url})`}}>
    <div className={'bg'}></div>
    {guest?.status === 'REJECTED' ? positiveCancelAnswer : firstFormView}
  </div>;
}
