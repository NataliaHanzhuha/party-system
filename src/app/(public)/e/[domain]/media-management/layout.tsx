import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Media Management'
  };
}

export default function Layout({children}: any) {
  return children;
}
