'use client';

import { Button, Flex, Layout, Typography } from 'antd';
import Link from 'next/link';
import { permissions } from '@/src/app/(public)/e/[domain]/(settings)/permits';

export default function Page({}) {
  return (
    <Layout style={{
      height: '100vh'
    }}>
      <Layout.Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Flex gap="small"
              justify={'space-between'}
              align={'center'}
              style={{width: '100%'}}>
          <Typography.Title level={3}
                            style={{color: 'white'}}>Party System</Typography.Title>
          <Link href={'/celebrant/login'}>
            <Button>Celebrant Login</Button>
          </Link>
        </Flex>
      </Layout.Header>

      <Layout.Content style={{
        padding: '0 48px',
        flex: 1,
        minHeight: '85vh',
        background: 'black'
      }}>
        <Flex gap="small"
              style={{
                padding: 24,
                height: '100%'
              }}
              justify={'center'}
              wrap={'wrap'}
              align="center">
          <Flex gap={'small'}
                vertical={true}
                align={'center'}
                justify={'center'}>
            <Typography.Title level={1}
                              style={{color: 'white'}}>Welcome to Party System!</Typography.Title>
            <Typography.Title level={3}
                              style={{color: 'darkgrey'}}>We can give you rsvp or media guests </Typography.Title>
            <p style={{color: 'white'}}>Coming soon...</p>

          </Flex>

          {/*<div className={'wrapper'}>*/}
          {/*  <iframe loading="lazy"*/}
          {/*          className={'frame'}*/}
          {/*          src="https://www.canva.com/design/DAGFIruX6nM/bVNcpqqApYOplIo_Rrt83g/view?embed"*/}
          {/*          allow="fullscreen">*/}
          {/*  </iframe>*/}
          {/*</div>*/}
        </Flex>
      </Layout.Content>

      <Layout.Footer style={{textAlign: 'center', justifySelf: 'end', gap: '10px', background: 'black'}}>
        <span style={{color: 'white'}}> Ant Design ©{new Date().getFullYear()} Created by Party System</span>
        <Link href="/login">
          <Button type={'link'}>Admin Login</Button>
        </Link>
      </Layout.Footer>
    </Layout>
  );
}
