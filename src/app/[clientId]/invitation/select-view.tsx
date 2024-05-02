import JulietInvitation from '@/src/components/JulietPage/juliet-invitation';
import DefaultInvitation from '@/src/components/default-form';
import { PageView } from '@/types/types';

export default function selectComponent(
  clientId: string,
  data: any,
  guestId?: string) {
  const getComponentData = guestId
    ? {...data}
    : {
      client: {
        name: data?.name,
        id: clientId
      }
    };

  const invitationPage = guestId ? data?.client?.invitationPage : data?.invitationPage;


  switch (invitationPage) {
    case PageView[PageView.JULIETPAGE] : {
      return <JulietInvitation data={getComponentData}/>;
    }
    default: {
      return <DefaultInvitation data={getComponentData}/>;
    }
  }

};
