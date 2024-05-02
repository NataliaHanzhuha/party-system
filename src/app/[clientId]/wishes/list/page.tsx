'use client';

import axios from 'axios';
import useSWR from 'swr';
import Loading from '@/src/components/loading';
import { Wish } from '@prisma/client';
import styles from './wishList.module.css';

export default function WishList({params}: any) {
  const {clientId} = params;
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const {data, error, isLoading} = useSWR('/api/wish?clientId=' + clientId, fetcher);

  if (isLoading) {
    return <Loading/>;
  }

  if (!data?.id) {
    return 'Any wishes yet';
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
