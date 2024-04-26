import { Guest } from '@prisma/client';
import DefaultInvitation from '@/components/default-form';
import JulietCancelInvitation from '@/components/JulietPage/juliet-cancel';

export default function selectComponent(data: Guest) {
  switch (data?.client?.invitationPage) {
    case 'JULIETPAGE' : {
      return <JulietCancelInvitation data={data}/>;
    }
    default: {
      return <DefaultInvitation data={data}/>;
    }
  }

};
