import { Suspense } from 'react';
import Loading from '@/src/app/(public)/e/[domain]/loading';

export default function Layout({children}: any) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}
