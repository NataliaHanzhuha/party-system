'use client';

import type { MenuProps } from 'antd';
import { Avatar, Breadcrumb, ConfigProvider, Dropdown, Layout, Typography } from 'antd';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard({children}: any) {
  const {data: session, status} = useSession();
  useEffect(() => {
    if (!session?.user && status === 'unauthenticated') {
      redirect('/');
    }
  }, [session, status]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span onClick={async () => {
          await signOut({redirect: false});
          redirect('/login')
        }}>
          Sign out
        </span>
      ),
    }
  ];

  return (
    <SessionProvider session={children.session}>
      <ConfigProvider
        theme={{
          components: {
            Breadcrumb: {
              itemColor: 'white',
              lastItemColor: 'yellow'
            },
          },
        }}
      >
        <Layout style={{minHeight: '100vh'}}>
          <Layout.Header style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography.Title level={3}
                              style={{color: 'white'}}>Party System</Typography.Title>

            <Dropdown menu={{items}}
                      placement="bottom">
              <Avatar size={{ sm: 32, md: 40, lg: 44}}
              >{session?.user?.name ?? 'USER'}</Avatar>
            </Dropdown>

            {/*<Breadcrumb style={{color: 'white !important'}}*/}
            {/*            itemRender={itemRender}*/}
            {/*            routes={routes}*/}
            {/*/>*/}
          </Layout.Header>
          <Layout.Content style={{padding: '0 48px'}}>
            <div style={{flex: 1}}>
              {children}
            </div>
          </Layout.Content>
          <Layout.Footer style={{textAlign: 'center', padding: 0}}>Created by Nata Hanzhuha</Layout.Footer>
        </Layout>
      </ConfigProvider>
    </SessionProvider>
  );
}
