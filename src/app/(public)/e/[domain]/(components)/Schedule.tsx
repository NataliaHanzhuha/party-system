import style from '@/src/app/(public)/e/[domain]/(styles)/domain.module.css';
import { ScheduleItem, ThemeType } from '@/src/app/(settings)/constant';
import useTheme from '@/src/app/(public)/e/[domain]/(hooks)/useTheme';

interface ScheduleProps {
  mode: ThemeType,
  items: ScheduleItem[]
}

export default function Schedule({mode, items}: ScheduleProps) {
  const theme = useTheme(mode);

  return <section className={`${style.schedule} ${theme}`}>
    <div className={style.bg}></div>

    <div className={style.scheduleWrapper}>
      <h2><b>Schedule</b></h2>

      {!!items?.length && items?.map((item: ScheduleItem, i: number) => {
        return <div className={style.scheduleItem}
                    key={i + 'event'}>
          <h4>{item.time}</h4>
          <h3>{item.title}</h3>
          <p>{item.details}</p>
        </div>;
      })}
    </div>
  </section>;
}
