import DefaultInvitation from '@/components/default-form';
import JulietCancelInvitation from '@/components/JulietPage/juliet-cancel';

export default function selectComponent(data: any) {
  switch (data?.client?.invitationPage) {
    case 'JULIETPAGE' : {
      return <JulietCancelInvitation data={data}/>;
    }
    default: {
      return <DefaultInvitation data={data}/>;
    }
  }

};
