import useSWR from 'swr';
import { fetcher, swrOptions } from '@/lib/auth/session';
import Loading from '@/src/app/(public)/e/[domain]/loading';

export async function useFetchedData(url: string) {
  const {data, error, isLoading} = await useSWR(url, fetcher, swrOptions);

  if (isLoading && !data) {
    return <Loading />;
  }

  return {data: data};
}
