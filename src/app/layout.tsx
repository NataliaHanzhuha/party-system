import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Juliet Party",
  description: "RSVP site for Juliet Party Guests",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    description: 'Here all friends of Juliet could leave their data for party invitation',
    images: `./juliet-photo.png`,
    locale: 'en_US',
    type: 'website',
    siteName: 'Juliet RSVP'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={inter.className}>
    <link rel="icon"
          href="/favicon.ico"
          sizes="any"/>
    <AntdRegistry>{children}</AntdRegistry>
    </body>
    </html>
  );
}
