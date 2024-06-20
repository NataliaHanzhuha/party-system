import style from '@/src/app/(public)/e/[domain]/(styles)/domain.module.css';
import { dateAndTime, dayAndMonth } from '@/src/app/(public)/e/[domain]/(helpers)/date-functions';
import { ThemeType } from '@/src/app/(public)/e/[domain]/(settings)/constant';
import useTheme from '@/src/app/(public)/e/[domain]/(hooks)/useTheme';
import RSVPButton from '@/src/app/(public)/e/[domain]/(components)/RSVPButton';

interface AboutProps {
  name: string,
  date: Date,
  rsvpLink: string | null,
  location: string,
  details: string,
  mode: ThemeType
}

export default function About({name, date, rsvpLink, location, details, mode}: AboutProps) {
  const theme = useTheme(mode);

  return <section className={`${style.about} ${theme}`}>
    <div className={style.bg}></div>
    <div className={style.aboutContent}>
      <div className={style.aboutText}>
        <div className={style.aboutContentTitle}>
          <strong>{name} Birthday</strong>
          <p className={style.plead}>Join us on {dayAndMonth(date)}</p>
        </div>

        <div className={style.aboutDescription}
             dangerouslySetInnerHTML={{__html: details}}></div>
      </div>

      <div className={style.aboutDetails}>
        <RSVPButton rsvpLink={rsvpLink} mode={mode} />
        {/*{rsvpLink !== null && <a rel="nofollow"*/}
        {/*                         href={rsvpLink}*/}
        {/*                         className={style.button}>*/}
        {/*  RSVP Now</a>}*/}

        <div className={style.aboutDetailsContainer}>
          <h4>LOCATION</h4>
          <p>{location}</p>

          <h4>DATE & TIME</h4>
          <p>{dateAndTime(date)}</p>
        </div>
      </div>
    </div>
  </section>;
}
