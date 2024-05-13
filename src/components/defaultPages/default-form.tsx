'use client';

import { Form } from 'antd';
import { useState } from 'react';
import { Guest } from '@prisma/client';
import styles from '@/src/components/JulietPage/juliet-invitation.module.css';
import { InvitationForm } from '@/src/components/ui/InvitationForm';
import { finalTmpl, firstForm, firstFormReject, positiveCancelAnswer } from '@/src/components/ui/elements';
import { CustomThemeWrapper } from './elements';

export default function DefaultInvitation({data}: any) {
  const initialValue = {
    name: data?.name ?? '',
    email: data?.email ?? '',
    extraPerson1: data?.extraPerson1 ?? undefined,
    clientId: data?.client?.id,
    id: data?.id ?? null
  };
  const [form] = Form.useForm();
  const [agreedForRSVP, isAgreed] = useState<boolean | null>(null);
  const [isSavedGuest, setSavedGuest] = useState<Guest | null>(null);
  const title = `${data?.client?.name}'s party`;
  const message = `You are cordially Invited to ${title}`;
  const formTmp = <div>
    <h2 className={styles.heading}>{title}</h2>

    <InvitationForm form={form}
                    initialValue={initialValue}
                    styles={styles}
                    saved={(guest: Guest) => setSavedGuest(guest)}/>
  </div>;

  const firstFormView = agreedForRSVP === null
    ? firstForm(message, () => isAgreed(true), () => isAgreed(false), styles,
      <h2>Do you want to RSVP?</h2>)
    : agreedForRSVP
      ? formTmp
      : firstFormReject(data?.client?.name, data?.client?.id, styles);

  const view = data?.status === 'REJECTED'
    ? positiveCancelAnswer(styles)
    : isSavedGuest
      ? finalTmpl(data?.client?.name, data?.client?.id, styles)
      : !data?.id ? firstFormView : formTmp;

  console.log('default');
  return <CustomThemeWrapper>{view}</CustomThemeWrapper>;
}
