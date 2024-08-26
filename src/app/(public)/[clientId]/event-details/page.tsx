'use client';

import useSWR from 'swr';
import { fetcher, swrOptions } from '@/lib/auth/session';
import Loading from '@/src/components/ui/loading';
import NotFound from '@/src/components/defaultPages/not-found';
import { CustomThemeWrapper, finalTmpl } from '@/src/components/JulietPage/elements';

export default function EventDetails({params}: any) {
  const {clientId} = params;
  const {data, error, isLoading} = useSWR('/api/client?id=' + clientId, fetcher, swrOptions);

  if (isLoading) {
    return <Loading backgroundColor={'black'}/>;
  }

  if (!data?.id || error) {
    return <NotFound />;
  }

  return <CustomThemeWrapper>
    {finalTmpl(data?.name, data?.id)}
  </CustomThemeWrapper>;
}
