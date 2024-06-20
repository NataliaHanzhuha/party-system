'use client';

import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import { Avatar, Card, Empty, Flex, Modal, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
// import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ClientEditForm from '@/src/components/ClientEditForm';
import { Client } from '@prisma/client';

export default function Page() {
  const session = useSession();
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const {data, isLoading, mutate} = useSWR('/api/client', fetcher);

  useEffect(() => {
    if (session?.status === 'unauthenticated') {
      // redirect('/login');
    }

  }, [session]);

  if (isLoading) {
    return 'loading...';
  }

  const info = () => {
    const modal = Modal.info({
      title: 'Add New Client Data',
      icon: null,
      width: '600px',
      closable: true,
      content: <ClientEditForm client={data}
                               close={() => modal.destroy()}
                               update={async (value: Client) => {
                                 console.log(value);
                                 let s = await axios.patch('/api/client', value);
                                 await mutate([...data, s]);
                                 modal.destroy();
                               }}/>,
      footer: null
    });
  };

  return <div>
    <h2>Clients ({data?.length})</h2>
    {data?.length
      ? <Flex wrap={'wrap'}
              gap="small">{data?.map((client: any) =>
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
      )}
        <Card style={{width: 300}}
              key="1">
          <Typography.Title level={3}
                            onClick={() => info()}>Add new client</Typography.Title>
        </Card>
      </Flex>
      : <Empty description={'No clients yet'}/>}
  </div>;
}
