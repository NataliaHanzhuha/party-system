import { useState } from 'react';
import axios from 'axios';
import { Guest } from '@prisma/client';
import { CustomThemeWrapper, finalTmpl, firstForm, firstFormReject } from '@/components/JulietPage/elements';

export default function JulietCancelInvitation({data}: any) {
  const [agreedForRSVP, isAgreed] = useState<boolean | null>(null);
  const cancelGuest = async (data: Guest) => {
    const guest = await axios.put(
      '/api/guest?id=' + data?.id + '&clientId=' + data?.clientId, null);

    isAgreed(!!Object.keys(guest)?.length);
  };

  const message = ` You are sure you want cancel your Registration to ${data?.client?.name}'s 50th birthday party (28.09.2024)`;
  const firstFormView = agreedForRSVP === null
    ? firstForm(message, () => cancelGuest(data), () => isAgreed(false))
    : agreedForRSVP
      ? firstFormReject(data?.client?.name)
      : finalTmpl(data?.client?.name);

  return <CustomThemeWrapper>{firstFormView}</CustomThemeWrapper>;
}
