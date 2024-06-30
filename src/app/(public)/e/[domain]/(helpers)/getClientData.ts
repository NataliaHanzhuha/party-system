import { Metadata } from 'next';
import { fromKebabToCapitalCase } from '@/src/utills/text-processing';
import axios from 'axios';
import { permissions } from '@/src/app/(public)/e/[domain]/(settings)/permits';

export async function getClientData(params: any, pageName: string | null): Promise<Metadata> {
  const {domain}: { domain: string } = params;
  const clientName = fromKebabToCapitalCase(domain);
  const url = process.env.NEXTAUTH_URL + '/api/client?name=' + clientName;
  const client: any = await axios.get(url).then(res => res.data);

  if (!client) {
    throw Error('Not Found this Celebrant');
  }

  console.log(domain, clientName, 'getClientData');

  return client?.settings?.metadata;
}
