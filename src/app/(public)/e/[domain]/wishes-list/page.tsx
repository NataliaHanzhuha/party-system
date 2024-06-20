'use client';

import { Client, Wish } from '@prisma/client';
import styles from '../(styles)/wishList.module.css';
import { usePermition } from '@/src/app/(public)/e/[domain]/(hooks)/usePermition';
import { PagesViews } from '@/src/app/(public)/e/[domain]/(settings)/constant';
import { useClientContext } from '@/src/app/(public)/e/[domain]/(layout)/MediaManagerLayout';
import { Avatar, Empty, Flex, Typography } from 'antd';
import useSWR from 'swr';
import { fetcher, swrOptions } from '@/lib/auth/session';
import Loading from '@/src/app/(public)/e/[domain]/loading';
import { Suspense } from 'react';

const date = (date: Date): string => {
  const d = new Date(date);
  return `${d.toLocaleTimeString()} • ${d.toDateString()}`;
};

const colors = [
  '#ffadd2', '#ffa39e', '#ffbb96', '#ffd591',
  '#ffe58f', '#eaff8f', '#b7eb8f', '#87e8de',
  '#91caff', '#adc6ff'];

export default function WishList() {
  const client: any = useClientContext();

  usePermition(PagesViews.WISHES);

  const {data, error, isLoading} = useSWR('/api/wish?clientId=' + client.id, fetcher, swrOptions);

  if (isLoading && !data) {
    return <Loading/>;
  }

  return <div className={styles.page}>
    <Typography.Title level={2}
                      style={{textAlign: 'center'}}>Wishes for {client?.name}</Typography.Title>
    <Suspense fallback={<Loading />}>
    {data?.length
      ? <Flex vertical
              gap="large">
        {data?.map((wish: Wish, index: number) => {
          const avatarColor = index % colors?.length;
          return <Flex key={index}
                       gap="middle"
                       vertical
                       className={styles.comment}>
            <Flex gap="middle"
                  align="center"
                  vertical={false}>
              <Avatar style={{backgroundColor: colors[avatarColor]}}>{wish?.name[0].toUpperCase()}</Avatar>
              <Flex vertical>
                <Typography.Text className={styles.author}>{wish?.name}</Typography.Text>
                <small>@Guest</small>
              </Flex>
            </Flex>

            <Typography.Text>{wish?.text}</Typography.Text>

            <Typography.Text style={{color: 'gray'}}>{date(wish?.createdAt)}</Typography.Text>

          </Flex>;
        })}
      </Flex>
      : <Empty description="No wishes for you yet..."/>}
    </Suspense>
  </div>;
}
