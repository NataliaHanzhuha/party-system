'use client';

import { Avatar, Layout, Dropdown } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import type { MenuProps } from 'antd';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
export default function Dashboard({children}: any) {
  const {data: session, status} = useSession();
  useEffect(() => {
    if(!session?.user && status === 'unauthenticated') {
      redirect('/login')
    }
  }, [session?.user]);
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span onClick={async () => {
          await signOut({redirect: false})
        }}>
          Sign out
        </span>
      ),
    }
  ];
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Layout.Header style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div className="demo-logo"/>
        <Dropdown menu={{ items }} placement="bottom">
        <Avatar size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100}}
        >{session?.user?.name ?? 'USER'}</Avatar>
        </Dropdown>
      </Layout.Header>
      <Layout.Content style={{padding: '0 48px'}}>
        <div style={{flex: 1}}>
          {children}
        </div>
      </Layout.Content>
      <Layout.Footer style={{textAlign: 'center'}}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Layout.Footer>
    </Layout>
  );
}
