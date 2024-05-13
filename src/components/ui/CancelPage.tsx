import { useState } from 'react';
import { Guest } from '@prisma/client';
import axios from 'axios';
import { firstForm, positiveCancelAnswer } from '@/src/components/ui/elements';

export default function CancelPage({data, styles}: any) {
  const [agreedForRSVP, isAgreed] = useState<boolean | null>(null);
  const cancelGuest = async (data: Guest) => {
    const guest = await axios.put(
      '/api/guest?id=' + data?.id + '&clientId=' + data?.clientId, null);

    isAgreed(!!Object.keys(guest)?.length);
  };

  const message = `Are you sure you want to cancel your Reservation?`;
  const firstFormView = agreedForRSVP === null
    ? firstForm(message, () => cancelGuest(data), () => isAgreed(false), styles)
    : agreedForRSVP
      ? positiveCancelAnswer(styles)
      : <div className={styles.notification}>Thank you for your Confirmation; your Reservation will remain.</div>;

  return {firstFormView, positiveCancelAnswer: positiveCancelAnswer(styles)};
}
