import ClientTable from '@/src/components/ClientTable';
import { Roles } from '@/types/types';

interface PostsEditProps {
  params: {
    id: string;
  };
}

export default function ClientData({params}: PostsEditProps) {
  return <ClientTable id={params.id} role={Roles.Admin}/>;
}
