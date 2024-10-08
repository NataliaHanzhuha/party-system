'use client';

import { CustomThemeWrapper } from '@/src/components/JulietPage/elements';
import styles from '@/src/components/JulietPage/juliet-invitation.module.css';
import { Wish } from '@prisma/client';
import axios from 'axios';
import { ReactNode, useState } from 'react';
import WishPage from '@/src/components/ui/WishPage';

export default function JulietWishForm({data}: any): ReactNode {
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
