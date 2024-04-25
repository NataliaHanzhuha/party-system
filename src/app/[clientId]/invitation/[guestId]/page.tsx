'use client';

import axios from 'axios';
import useSWR from 'swr';
import JulietInvitation from '@/components/juliet-invitation';
import DefaultInvitation from '@/components/default-form';
import { Guest } from '@prisma/client';
import selectComponent from '@/app/[clientId]/invitation/select-view';

export default function InvitationUpdate({params}: any) {
  const {clientId, guestId} = params;
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const {data, error, isLoading} = useSWR('/api/guest?id=' + guestId + '&clientId=' + clientId, fetcher);

  if (isLoading) {
    return 'loading...';
  }

  if (!data?.id) {
    return 'no such client';
  }

  if (!data?.id) {
    return 'no such client';
  }

  console.log(data);



// const selectComponent = (clientId: string, data: Guest, guestId: string) => {
//   const getComponentData = guestId
//     ? {...data}
//     : {
//       client: {
//         name: data?.name,
//         id: clientId
//       }
//     };
//
//   switch (clientId) {
//     case 'clvcvmyqj0000uxth6j534pb5': {
//       return <JulietInvitation data={getComponentData}/>;
//     }
//     default: {
//       return <DefaultInvitation data={getComponentData}/>;
//     }
//   }
//
// };

return selectComponent(clientId, data, guestId);
}
