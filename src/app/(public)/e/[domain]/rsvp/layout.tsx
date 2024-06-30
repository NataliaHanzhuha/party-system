import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'RSVP'
  };
}

export default function Layout({children}: any) {
  return children;
}
