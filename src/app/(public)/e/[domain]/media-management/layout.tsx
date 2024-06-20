import { Metadata } from 'next';
import { LS_ClientID } from '@/src/app/(public)/e/[domain]/(settings)/constant';
import { permissions } from '@/src/app/(public)/e/[domain]/(settings)/permits';
import { getClientData } from '@/src/app/(public)/e/[domain]/(helpers)/getClientData';

export async function generateMetadata({params}: any): Promise<Metadata> {
  return {
    title: 'Media Management'
  };
}
export default function Layout({children}: any) {
  return children;
}
