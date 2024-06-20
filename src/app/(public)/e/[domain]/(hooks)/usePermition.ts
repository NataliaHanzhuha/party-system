import { IPermitionContext, usePermitionContext } from '@/src/app/(public)/e/[domain]/(layout)/MediaManagerLayout';
import { IPartyDetails, IPermition, PagesViews } from '@/src/app/(settings)/constant';
import { redirect } from 'next/navigation';

export function usePermition(name: string): any {
  let {permition}: IPermitionContext = usePermitionContext();

  if (!permition) {
    redirect('/');
  }

  permition = permition as IPermition;

  if (permition && !permition[name]) {
    redirect('/');
  }

  return permition[name];
}
