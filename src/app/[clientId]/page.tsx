import { NextSeo } from 'next-seo';

export function generateMetadata() {
  return {
    title: {absolute: 'Juliet Party RSVP'},
    description: 'RSVP site for Juliet Party Guests',
    // openGraph: {
    //   description: 'Here all friends of Juliet could leave their data for party invitation',
    //   images: `https://firebasestorage.googleapis.com/v0/b/dad-birthday-party.appspot.com/o/party-system%2Fd48a1017-8d92-4aa1-b8d2-49021fefa6d1%204%20(1).png?alt=media&token=2ad83ebf-142b-4d11-bf4e-b5e8cb420fa2`,
    //   locale: 'en_US',
    //   type: 'website',
    //   siteName: 'Juliet RSVP'
    // }
  };
};

export default function ClientRSVPPage() {
  return <>
    <NextSeo
      title="Simple Usage Example"
      description="RSVP site for Juliet Party Guests"
      openGraph={{
          description: 'Here all friends of Juliet could leave their data for party invitation',
          images: [
            {
              url: `https://firebasestorage.googleapis.com/v0/b/dad-birthday-party.appspot.com/o/party-system%2Fd48a1017-8d92-4aa1-b8d2-49021fefa6d1%204%20(1).png?alt=media&token=2ad83ebf-142b-4d11-bf4e-b5e8cb420fa2`,
              width: 300,
              height: 600,
              alt: 'Juliet',
              type: 'image/png'
            }
          ],
          locale: 'en_US',
          type: 'website',
          siteName: 'Juliet RSVP'
      }}
    />
  </>
}
