import { Client, Guest } from '@prisma/client';
import JulietInvitation from '@/components/JulietPage/juliet-invitation';
import DefaultInvitation from '@/components/default-form';

export default function selectComponent(
  clientId: string,
  data: Guest | Client,
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
    case 'JULIETPAGE' : {
      return <JulietInvitation data={getComponentData}/>;
    }
    default: {
      return <DefaultInvitation data={getComponentData}/>;
    }
  }

};
