'use client';

import React, { useState } from 'react';
import { Typography } from 'antd';
import MediaForm from '@/src/app/(public)/e/[domain]/(components)/MediaForm';
import { useClientContext } from '@/src/app/(public)/e/[domain]/(layout)/MediaManagerLayout';
import { Client } from '@prisma/client';
import { PagesViews } from '@/src/app/(settings)/constant';
import { usePermition } from '@/src/app/(public)/e/[domain]/(hooks)/usePermition';

import styles from '@/src/app/(public)/e/[domain]/(styles)/mm.module.css';

const {Title, Text} = Typography;

export default function Page() {
  const client: any = useClientContext();
  const [isSent, setSent] = useState(false);

  usePermition(PagesViews.MEDIA_MANAGEMENT);

  return <div className={styles.mediaWrapper}>
    <Title level={1}>Media Management</Title>
    {isSent
      ? <Text>Thank you. We will send you email as soon as possible</Text>
      : <>
        <Text>Thank you for visit this <b>{client?.name ?? 'celebrant'}&#39;s party</b>.
              If you want to get email with all media links, please, fill form bellow</Text>

        <MediaForm sent={setSent}/>
      </>}

  </div>;
}
