'use client';

import { ThemeType } from '@/src/app/(public)/e/[domain]/(settings)/constant';
import useTheme from '@/src/app/(public)/e/[domain]/(hooks)/useTheme';

interface RSVPButtonProps {
  rsvpLink: string | null;
  mode: ThemeType;
}

export default function RSVPButton({rsvpLink, mode}: RSVPButtonProps) {
  const theme = useTheme(mode);

  return rsvpLink !== null
    ? <a rel="nofollow"
         href={rsvpLink}
         className={`${theme} button`}>Leave Wishes</a>
    : null;
}
