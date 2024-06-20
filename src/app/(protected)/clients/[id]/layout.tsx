import { Metadata } from 'next';
import axios from 'axios';

export async function generateMetadata({params}: any): Promise<Metadata> {
  const {id} = params;

  const client: any = await axios.get(process.env.NEXTAUTH_URL + '/api/client?id=' + id)
    .then(res => res.data);
  return {
    title: 'Celebrant ' + client?.name ?? 'Celebrant ',
    description: 'Table data with celebrant guests info'
  };
}

export default function Layout({children}: any) {
  return children;
}
