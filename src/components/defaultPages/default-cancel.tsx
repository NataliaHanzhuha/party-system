'use client';

import { CustomThemeWrapper } from './elements';
import styles from '@/src/components/JulietPage/juliet-invitation.module.css';
import CancelPage from '@/src/components/ui/CancelPage';

export default function DefaultCancel({data}: any) {
  const {positiveCancelAnswer, firstFormView} = CancelPage({data, styles});

  return <CustomThemeWrapper>
    {data?.status === 'REJECTED' ? positiveCancelAnswer : firstFormView}
  </CustomThemeWrapper>;
}
