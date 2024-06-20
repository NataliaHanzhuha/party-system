// 'use client';

import Dashboard from '@/src/components/dashboard';
import { Metadata } from 'next';
import AdminProvider from '@/src/components/admin-provider';

export function generateMetadata(): Metadata {
  return {
    title: 'Dashboard',
  };
}

export default function ClientLayout({children}: any) {
  return <AdminProvider>
    <Dashboard>{children}</Dashboard>
  </AdminProvider>;
}
