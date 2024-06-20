'use client';

import { usePermition } from '@/src/app/(public)/e/[domain]/(hooks)/usePermition';
import { IRSVPDetails, PagesViews } from '@/src/app/(public)/e/[domain]/(settings)/constant';
import { RSVPForm } from '@/src/app/(public)/e/[domain]/(components)/(rsvp)/RSVPForm';
import { useState } from 'react';
import { IClientContext, useClientContext } from '@/src/app/(public)/e/[domain]/(layout)/MediaManagerLayout';
import styles from '@/src/app/(public)/e/[domain]/(styles)/rsvp.module.css';
import { finalTmpl, firstForm, firstFormReject, positiveCancelAnswer } from '@/src/app/(public)/e/[domain]/(components)/(rsvp)/elements';
import { Form, Typography } from 'antd';
import { GuestStatus, IClient, IGuest, } from '@/types/types';
import { dayAndMonth } from '@/src/app/(public)/e/[domain]/(helpers)/date-functions';
import useTheme from '@/src/app/(public)/e/[domain]/(hooks)/useTheme';
import style from '@/src/app/(public)/e/[domain]/(styles)/domain.module.css';

interface IRSVPPage {
  data?: IGuest;
  domain: string;
}

export default function InvitationPage({data, domain}: IRSVPPage) {
  let client: any = useClientContext();
  let permission: any = usePermition(PagesViews.RSVP);
  const theme = useTheme(permission.mode);

  permission = permission as IRSVPDetails;
  client = (client as any) as IClient;

  const initialValue = {
    name: data?.name ?? '',
    email: data?.email ?? '',
    extraPerson1: data?.extraPerson1 ?? undefined,
    clientId: client?.id,
    id: data?.id ?? null
  };
  const [form] = Form.useForm();
  const [agreedForRSVP, isAgreed] = useState<boolean | null>(true);
  const [isSavedGuest, setSavedGuest] = useState<IGuest | null>({} as any);
  const title = `${client?.name} ${permission.title} (${dayAndMonth(permission.partyDate)})`;
  const message = `You are cordially Invited to ${title}`;

  const formTmp = <div className={styles.container}>
    <Typography.Title level={3}>{title}</Typography.Title>

    <RSVPForm form={form}
              initialValue={initialValue}
              styles={styles}
              saved={(guest: IGuest) => setSavedGuest(guest)}/>
  </div>;

  const firstFormView = agreedForRSVP === null
    ? firstForm(message, () => isAgreed(true), () => isAgreed(false),
      <Typography.Title level={4}>Do you want to RSVP?</Typography.Title>)
    : agreedForRSVP
      ? formTmp
      : firstFormReject(client!.name, domain);

  const view = data?.status === GuestStatus.REJECTED
    ? positiveCancelAnswer
    : isSavedGuest
      ? finalTmpl(client!.name, domain, permission.details)
      : !data?.id ? firstFormView : formTmp;

  return <div className={`${styles.page} ${theme}`} style={{backgroundImage: `url(${permission.url})`}}>
    <div className={'bg'}></div>
    {view}
  </div>;
}
