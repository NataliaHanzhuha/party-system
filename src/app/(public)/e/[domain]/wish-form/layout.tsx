import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Wish Form'
  };
}

export default function Layout({children}: any) {
  return children;
}
