'use client'
// import { redirect } from 'next/navigation';
// import { auth } from '../api/auth/[...nextauth]/auth';
import { Breadcrumb, Layout } from 'antd';

// const { Header, Content, Footer } = Layout;
export default function ClientLayout({children}: {children: React.ReactNode}) {
  // const session = await auth();
  //
  // if (!session) return redirect('/');

  return     <Layout>
    <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
    </Layout.Header>
    <Layout.Content style={{ padding: '0 48px' }}>
      {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
      {/*  <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
      {/*  <Breadcrumb.Item>List</Breadcrumb.Item>*/}
      {/*  <Breadcrumb.Item>App</Breadcrumb.Item>*/}
      {/*</Breadcrumb>*/}
      <div style={{flex: 1, height: '75vh'}}>
        {children}
      </div>
    </Layout.Content>
    <Layout.Footer style={{ textAlign: 'center' }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Layout.Footer>
  </Layout>;
}
