import { Metadata } from 'next';
import { JulietSettings } from '@/src/app/(public)/[clientId]/settings';

export async function generateMetadata(): Promise<Metadata> {
  // const {clientId} = params;
  // const url = process.env.NEXTAUTH_URL + '/api/client?id=' + clientId
  // const client: any = await axios.get(url).then(res => res.data);

  return {
    ...JulietSettings.metadata,
    title: 'Juliet\'s 50th Birthday Party',
    // description: 'Party details: 28/09/24 5:00 PM',
    openGraph: {
      ...JulietSettings.metadata?.openGraph,
      description: 'Party details: 28/09/24 5:00 PM',
    }
  };
}

export default function EventDetailsLayout({children}: any) {
  return children;
}
