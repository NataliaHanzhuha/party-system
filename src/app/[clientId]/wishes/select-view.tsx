import { Client } from '@prisma/client';
import DefaultInvitation from '@/src/components/default-form';
import JulietWishForm from '@/src/components/JulietPage/juliet-wishForm';

export default function selectComponent(data: Client) {
  switch (data?.invitationPage) {
    case 'JULIETPAGE': {
      return <JulietWishForm data={data}/>;
    }
    default: {
      return <DefaultInvitation data={data}/>;
    }
  }

};
