import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Metadata } from 'next';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: {
    template: '%s | Party System',
    default: 'Party System',
  },
    icons: {
    icon: '/favicon.ico',
  },
};


export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return <html lang="en"
               suppressHydrationWarning>
  <body className={inter.className}>
  <AntdRegistry>
    {children}
  </AntdRegistry>
  </body>
  </html>;
}
