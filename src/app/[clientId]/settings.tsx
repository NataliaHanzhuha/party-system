import { Client } from '@prisma/client';
import { PageView } from '@/types/types';

import JulietInvitation from '@/src/components/JulietPage/juliet-invitation';
import JulietCancelInvitation from '@/src/components/JulietPage/juliet-cancel';
import JulietWishForm from '@/src/components/JulietPage/juliet-wishForm';

import DefaultWish from '@/src/components/defaultPages/default-wish';
import DefaultInvitation from '@/src/components/defaultPages/default-form';
import DefaultCancel from '@/src/components/defaultPages/default-cancel';
import Loading from '@/src/components/ui/loading';
import NotFound from '@/src/components/defaultPages/not-found';

export const JulietSettings = {
  metadata: {
    title: 'RSVP: Juliet\'s 50th Birthday Party',
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
  },
  invitationTemplate: JulietInvitation,
  cancelTemplate: JulietCancelInvitation,
  wishTemplate: JulietWishForm,
  loading: <Loading backgroundColor={'black'}/>,
  error: <NotFound />
};

export const DefaultSettings = {
  metadata: (client: Client) => {
    return {
      title: client?.name ?? 'Celebrant ',
      description: 'RSVP site for celebrant guests',
    };
  },
  invitationTemplate: DefaultInvitation,
  cancelTemplate: DefaultCancel,
  wishTemplate: DefaultWish,
  loading: <Loading backgroundColor={'white'}/>,
  error: <NotFound />
};

export enum ViewType {
  Invitation,
  Cancelation,
  Wish
}

export const selectView = (type: ViewType, invitationPage: any, data: any) => {
  const fieldsArray: string[] = ['invitationTemplate', 'cancelTemplate', 'wishTemplate'];
  const selectedView: any = fieldsArray[type];

  let page = null;
  let loading = null;
  let error = null;

  switch (invitationPage) {
    case PageView[PageView.JULIETPAGE] : {
      // @ts-ignore
      const Invitation = JulietSettings[selectedView];

      page = <Invitation data={data}/>;
      loading = JulietSettings.loading;
      error = JulietSettings.error;
      break;
    }
    default: {
      // @ts-ignore
      const Invitation = DefaultSettings[selectedView];

      page = <Invitation data={data}/>;
      loading = DefaultSettings.loading;
      error = DefaultSettings.error;

      break;
    }
  }

  return {page, loading, error}
};
