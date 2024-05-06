import { Metadata } from 'next';
import axios from 'axios';
import { PageView } from '@/types/types';

// export function generateMetadata() {
//   return {
//     title: {absolute: 'Juliet Party RSVP'},
//     description: 'RSVP site for Juliet Party Guests',
//     // openGraph: {
//     //   description: 'Here all friends of Juliet could leave their data for party invitation',
//     //   images: `https://firebasestorage.googleapis.com/v0/b/dad-birthday-party.appspot.com/o/party-system%2Fd48a1017-8d92-4aa1-b8d2-49021fefa6d1%204%20(1).png?alt=media&token=2ad83ebf-142b-4d11-bf4e-b5e8cb420fa2`,
//     //   locale: 'en_US',
//     //   type: 'website',
//     //   siteName: 'Juliet RSVP'
//     // }
//   };
// };
const JulietPageMetadata = {
  title: "RSVP: Juliet's 50th Birthday Party",
  description: 'RSVP site for Juliet Party Guests',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    description: 'Here all friends of Juliet could leave their data for party invitation',
    images: {
      url: `https://firebasestorage.googleapis.com/v0/b/dad-birthday-party.appspot.com/o/party-system%2Fd48a1017-8d92-4aa1-b8d2-49021fefa6d1%204%20(1).png?alt=media&token=2ad83ebf-142b-4d11-bf4e-b5e8cb420fa2`,
      width: '630',
      height: '1200'
    },
    locale: 'en_US',
    type: 'website',
    siteName: 'Juliet RSVP'
  }
};

export async function generateMetadata({params}: any): Promise<Metadata> {
  const {clientId} = params;
  const url = process.env.NEXTAUTH_URL + '/api/client?id=' + clientId
  console.log(url);
  const client: any = await axios.get(url).then(res => res.data);

  return client?.invitationPage === PageView[PageView.JULIETPAGE]
    ? JulietPageMetadata
    : {
      title: client?.name ?? 'Celebrant ',
      description: 'hello world'
    };
}

export default function RootLayout({children}: any) {
  return children;
}
