import { Metadata } from 'next';
import axios from 'axios';
import { PageView } from '@/types/types';
import { DefaultSettings, JulietSettings } from '@/src/app/[clientId]/settings';
import { router } from 'next/client';

// export async function generateMetadata({params}: any): Promise<Metadata> {
//   const {clientId} = params;
//   console.log(clientId);
//   const url = process.env.NEXTAUTH_URL + '/api/client?domain=' + clientId
//   const client: any = await axios.get(url).then(res => res.data);
//
//   return client?.invitationPage === PageView[PageView.JULIETPAGE]
//     ? JulietSettings.metadata
//     : DefaultSettings.metadata(client);
// }

export default function RootLayout({children}: any) {
  return children;
}
