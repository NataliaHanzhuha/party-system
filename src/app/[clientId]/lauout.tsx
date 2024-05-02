import type { Metadata } from 'next';
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

export const metadata: Metadata = {
  description: "RSVP system for Juliet birthday party guests",
  icons: {
    icon: 'src/app/favicon.ico'
  },
  openGraph: {
  description: 'Juliet party',
    title: 'Juliet Party',
    url: 'http://localhost:3000'
  } as OpenGraph
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode}>) {
  return {children}
}
