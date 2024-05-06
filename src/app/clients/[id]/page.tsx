import ClientTable from '@/src/components/ClientTable';

interface PostsEditProps {
  params: {
    id: string;
  };
}

export default function ClientData({params}: PostsEditProps) {
  return <ClientTable id={params.id}/>;
}
