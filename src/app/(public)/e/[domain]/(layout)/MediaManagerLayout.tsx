'use client';

import React, { createContext, useContext } from 'react';
import styles from '@/src/app/(public)/e/[domain]/(styles)/mm.module.css';
import { ConfigProvider, Flex, Layout, theme, Typography } from 'antd';
import useSWR from 'swr';
import { fetcher, swrOptions } from '@/lib/auth/session';
import { fromKebabToCapitalCase } from '@/src/utills/text-processing';
import Loading from '@/src/app/(public)/e/[domain]/loading';
import ErrorPage from '@/src/app/(public)/e/[domain]/error';
import { emptyPermission, permissions } from '@/src/app/(public)/e/[domain]/(settings)/permits';
import Link from 'next/link';
import useDevMode from '@/src/app/(public)/e/[domain]/(hooks)/useDevMode';
import { IClient } from '@/types/types';
import { IPermition } from '@/src/app/(public)/e/[domain]/(settings)/constant';
import { mediaPath } from '@/src/app/router';

const {Footer, Content, Header} = Layout;

export interface IClientContext {
  client: IClient | null;
}

const ClientContext = createContext<IClientContext>({client: null});

export function useClientContext() {
  return useContext(ClientContext);
}

export interface IPermitionContext {
  permition: IPermition | null;
}

const PermitionContext = createContext<IPermitionContext>({permition: null});

export function usePermitionContext() {
  return useContext(PermitionContext);
}


interface ILayoutWrapper {
  children: React.ReactNode;
  params: {domain : string};
}

export function LayoutWrapper({children, params}: ILayoutWrapper) {
  const {domain}: {domain : string} = params;
  const themeData = {
    algorithm: theme.defaultAlgorithm,
    fontFamily: 'Montserrat',
    fontSize: 16,
    components: {
      Button: {
        defaultBg: '#eca817',
        contentFontSize: 18
      },
      Form: {
        labelFontSize: 22
      },
      Typography: {
        fontSize: 18
      },
    }
  };
  const {data: client, error, isLoading} = useSWR('/api/client?name=' + fromKebabToCapitalCase(domain), fetcher, swrOptions);
  const isDev = useDevMode();

  if (isLoading && !client) {
    return <Loading/>;
  }

  if (!isLoading && error) {
    return <ErrorPage/>;
  }

  const permition: IPermitionContext = {
    permition: permissions[client?.id] ?? emptyPermission
  };

  return <ConfigProvider theme={themeData}>
    <Layout className={styles.layout}>
      {/*{isDev && <Header className={styles.header}>*/}
      {/*  <Flex gap="middle" align="center" wrap='wrap'>*/}
      {/*    <Typography.Title level={4} style={{color: 'white', margin: 0}}>Dev header</Typography.Title>*/}
      {/*    <Link key='1' href={partySitePath}>Party Site</Link>*/}
      {/*    <Link key='2' href={rsvpPath}>RSVP</Link>*/}
      {/*    <Link key='4' href={wishesListPath}>Wishes List</Link>*/}
      {/*    <Link key='3' href={mediaPath}>Media</Link>*/}
      {/*  </Flex>*/}
      {/*</Header>}*/}

      <Content className={styles.main}>
        <ClientContext.Provider value={client}>
          <PermitionContext.Provider value={permition}>
            {children}
          </PermitionContext.Provider>
        </ClientContext.Provider>
      </Content>
      <Footer className={styles.footer}>
        Nata Hanzhuha ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  </ConfigProvider>;
}
