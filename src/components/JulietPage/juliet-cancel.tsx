import { useState } from 'react';
import axios from 'axios';
import { Guest } from '@prisma/client';
import { CustomThemeWrapper, firstForm } from '@/components/JulietPage/elements';
import styles from './juliet-invitation.module.css';

export default function JulietCancelInvitation({data}: any) {
  const [agreedForRSVP, isAgreed] = useState<boolean | null>(null);
  const cancelGuest = async (data: Guest) => {
    const guest = await axios.put(
      '/api/guest?id=' + data?.id + '&clientId=' + data?.clientId, null);

    isAgreed(!!Object.keys(guest)?.length);
  };

  const message = `Are you sure you want to cancel your Reservation?`;
  const firstFormView = agreedForRSVP === null
    ? firstForm(message, () => cancelGuest(data), () => isAgreed(false))
    : agreedForRSVP
      ? <div className={styles.notification}>Your Reservation is now cancelled.</div>
      : <div className={styles.notification}>Thank you for your Confirmation; your Reservation will remain.</div>;

  return <CustomThemeWrapper>{firstFormView}</CustomThemeWrapper>;
}
