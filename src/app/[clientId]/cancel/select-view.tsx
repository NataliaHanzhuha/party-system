import DefaultInvitation from '@/src/components/default-form';
import JulietCancelInvitation from '@/src/components/JulietPage/juliet-cancel';
import { PageView } from '@/types/types';

export default function selectComponent(data: any) {
  switch (data?.client?.invitationPage) {
    case PageView[PageView.JULIETPAGE] : {
      return <JulietCancelInvitation data={data}/>;
    }
    default: {
      return <DefaultInvitation data={data}/>;
    }
  }

};
