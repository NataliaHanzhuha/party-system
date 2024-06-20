import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'List of wishes'
  };
}

export default function Layout({children}: any) {
  return children;
}
