'use client';

import { CustomThemeWrapper } from '@/src/components/defaultPages/elements';
import { useState } from 'react';
import { Wish } from '@prisma/client';
import axios from 'axios';
import WishPage from '@/src/components/ui/WishPage';
import styles from './default.module.css';

export default function DefaultWish({data}: any) {
  const [isSentWish, sent] = useState<Wish | null>(null);

  const sendWish = async ({text, name}: any) => {
    const obj = {
      text,
      name: name?.trim() ?? 'Anonim',
      clientId: data?.id
    };
    const wish: Wish = await axios.post('/api/wish?clientId=' + data?.id, obj);

    sent(wish);
  };

  return <CustomThemeWrapper>
    {
      isSentWish
        ? <div className={styles.notification}>Thank you; your wish has been sent.</div>
        : <>
          <h2 style={{textAlign: 'center'}}>Leave your wish for {data?.name}</h2>
          <WishPage sendWish={sendWish} styles={styles}/>
        </>
    }
  </CustomThemeWrapper>;
}
