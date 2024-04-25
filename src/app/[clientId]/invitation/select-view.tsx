import { Guest } from '@prisma/client';
import JulietInvitation from '@/components/juliet-invitation';
import DefaultInvitation from '@/components/default-form';

export default function selectComponent(clientId: string, data: Guest, guestId?: string) {
  const getComponentData = guestId
    ? {...data}
    : {
      client: {
        name: data?.name,
        id: clientId
      }
    };

  switch (clientId) {
    case 'clvcvmyqj0000uxth6j534pb5': {
      return <JulietInvitation data={getComponentData}/>;
    }
    default: {
      return <DefaultInvitation data={getComponentData}/>;
    }
  }

};
