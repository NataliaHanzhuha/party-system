import JulietInvitation from '@/components/JulietPage/juliet-invitation';
import DefaultInvitation from '@/components/default-form';

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
    case 'JULIETPAGE' : {
      return <JulietInvitation data={getComponentData}/>;
    }
    default: {
      return <DefaultInvitation data={getComponentData}/>;
    }
  }

};
