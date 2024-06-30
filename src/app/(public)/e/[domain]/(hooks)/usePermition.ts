import { IPermition } from '@/src/app/(public)/e/[domain]/(settings)/constant';
import { redirect } from 'next/navigation';

export function usePermition(name: string, settings?: IPermition): any {
  if (!settings) {
    redirect('/');
  }

  if (settings && !settings[name]) {
    redirect('/');
  }

  if (settings && settings[name]) {
    return settings[name];
  }
}
