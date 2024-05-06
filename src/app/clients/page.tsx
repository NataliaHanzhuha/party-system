'use client';
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import { Avatar, Card, Empty, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getServerSession } from 'next-auth/next';
import { options } from '@/lib/auth/options';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';

export default function ClientList() {
  const session = useSession();
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const {data, error, isLoading} = useSWR('/api/client', fetcher);

  useEffect(() => {
    if (session?.status === 'unauthenticated') {
      redirect('/login');
    }

  }, [session])

  if (isLoading) {
    return 'loading...';
  }

  return <div>
    <NextSeo
      title="Simple Usage Example"
      description="A short description goes here."
    />
    <h2>Clients ({data?.length})</h2>
    {data?.length
      ? data?.map((client: any) =>
        <Card style={{width: 300}}
              key={client.id}>

          <Link href={`/clients/${client.id}`}>
            <Space wrap
                   size={16}>
              <Avatar size="large"
                      icon={<UserOutlined/>}/>
              <Typography.Title level={3}>{client.name}</Typography.Title>
            </Space>
          </Link>

        </Card>
      )
      : <Empty description={'No clients yet'}/>}
  </div>;
}
