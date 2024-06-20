import axios from 'axios';
import useSWR from 'swr';
import Loading from '@/src/components/ui/loading';

export default function useFetch(url: string) {
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const {data, error, isLoading} = useSWR(url, fetcher);

  if (isLoading) {
    return <Loading/>;
  }

  if (!data?.id) {
    return 'no such client';
  }

  return {data};
}
