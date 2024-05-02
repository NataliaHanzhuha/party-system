import { Client } from '@prisma/client';
import DefaultInvitation from '@/src/components/default-form';
import JulietWishForm from '@/src/components/JulietPage/juliet-wishForm';
import { PageView } from '@/types/types';

export default function selectComponent(data: Client) {
  switch (data?.invitationPage) {
    case PageView[PageView.JULIETPAGE]: {
      return <JulietWishForm data={data}/>;
    }
    default: {
      return <DefaultInvitation data={data}/>;
    }
  }

};
