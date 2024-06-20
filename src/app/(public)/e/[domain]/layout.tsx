import { LayoutWrapper } from '@/src/app/(public)/e/[domain]/(layout)/MediaManagerLayout';
import './(styles)/theme.css';
import { Metadata } from 'next';
import { getClientData } from '@/src/app/(public)/e/[domain]/(helpers)/getClientData';

export async function generateMetadata({params}: any): Promise<Metadata> {
  return getClientData(params, null);
}
export default function RootLayout({children, params}: any) {
  return <LayoutWrapper params={params}>{children}</LayoutWrapper>;
}

