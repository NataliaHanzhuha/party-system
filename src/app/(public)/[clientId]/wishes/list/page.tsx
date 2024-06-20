'use client';

import useSWR from 'swr';
import Loading from '@/src/components/ui/loading';
import { Wish } from '@prisma/client';
import styles from './wishList.module.css';
import { fetcher, swrOptions } from '@/lib/auth/session';
import NotFound from '@/src/components/defaultPages/not-found';

export default function WishList({params}: any) {
  const {clientId} = params;
  const {data, error, isLoading} = useSWR('/api/wish?clientId=' + clientId, fetcher, swrOptions);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.id || error) {
    return <NotFound />;
  }

  const date = (date: Date): string => {
    const d = new Date(date);
    return `${d.toDateString()} ${d.toLocaleTimeString()}`;
  }

  return <div className={styles.page}>
    <h2 style={{textAlign: 'center'}}>Wishes for {data?.name}</h2>

    <div className={styles.commentWrapper}>
      {data?.wishes?.map((wish: Wish, index: number) => {
        return <div key={index} className={styles.comment}>
          <p>{wish?.text}</p>
          <div className={styles.info}>
            <span className={styles.author}>{wish?.name}</span>
            <span> {date(wish?.createdAt)}</span>
          </div>

        </div>
      })}
    </div>
  </div>;
}
