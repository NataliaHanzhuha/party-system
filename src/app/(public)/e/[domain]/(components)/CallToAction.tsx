import style from '@/src/app/(public)/e/[domain]/(styles)/domain.module.css';
import { dayAndMonth } from '@/src/app/(public)/e/[domain]/(helpers)/date-functions';
import { ThemeType } from '@/src/app/(settings)/constant';
import RSVPButton from '@/src/app/(public)/e/[domain]/(components)/RSVPButton';
import useTheme from '@/src/app/(public)/e/[domain]/(hooks)/useTheme';

interface CallToActionProps {
  date: Date,
  rsvpLink: string | null,
  mode: ThemeType
}

export default function CallToAction({date, rsvpLink, mode}: CallToActionProps) {
  const theme = useTheme(mode);

  return <section className={`${style.callToAction} ${theme}`}>
    <div className={style.bg}></div>
    <div className={style.container}>
      <h2>Join us on {dayAndMonth(date)}</h2>
      <p>We look forward to hosting you!</p>
      <RSVPButton rsvpLink={rsvpLink} mode={mode}/>
      {/*{rsvpLink !== null && <a rel="nofollow"*/}
      {/*                         href={rsvpLink}*/}
      {/*                         className={style.button}>RSVP Now</a>}*/}
    </div>
  </section>;
};
