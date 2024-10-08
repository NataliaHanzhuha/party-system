'use client';

import { CustomThemeWrapper } from '@/src/components/JulietPage/elements';
import styles from './juliet-invitation.module.css';
import CancelPage from '@/src/components/ui/CancelPage';

export default function JulietCancelInvitation({data}: any) {
  const {positiveCancelAnswer, firstFormView} = CancelPage({data, styles});

  return <CustomThemeWrapper>
    {data?.status === 'REJECTED' ? positiveCancelAnswer : firstFormView}
  </CustomThemeWrapper>;
}
