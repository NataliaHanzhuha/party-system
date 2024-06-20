import style from '@/src/app/(public)/e/[domain]/(styles)/domain.module.css';
import { dayAndMonth } from '@/src/app/(public)/e/[domain]/(helpers)/date-functions';
import { ThemeType } from '@/src/app/(public)/e/[domain]/(settings)/constant';
import useTheme from '@/src/app/(public)/e/[domain]/(hooks)/useTheme';

interface BannerProps {
  name: string;
  date: Date;
  url: string;
  mode: ThemeType
}

export default function Banner({name, date, url, mode}: BannerProps) {
  const theme = useTheme(mode);

  return <section className={`${style.banner} ${theme}`}
                  style={{backgroundImage: `url(${url})`}}>
    <div className={style.bg}></div>
    <div className={style.bannerContent}>
      <h1>{name} Birthday</h1>
      <p className={style.plead}>{dayAndMonth(date)}</p>
    </div>
  </section>;
}

