'use client';

import { useEffect, useState } from 'react';
import style from '@/src/app/(public)/e/[domain]/(styles)/domain.module.css';
import { ThemeType } from '@/src/app/(settings)/constant';
import useTheme from '@/src/app/(public)/e/[domain]/(hooks)/useTheme';

interface CountdownProps {
  date: Date,
  mode: ThemeType
}

export default function CountDown({date, mode}: CountdownProps) {
  const theme = useTheme(mode);

  const [time, setTime] = useState((date.getTime() - Date.now()) / 1000);

  const days = Math.floor(time / (3600 * 24));
  const hours = Math.floor((time / 3600) % 24);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = `${Math.floor(time % 60)}`.slice(0, 2);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else {
          return time - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  return <section className={`${style.countDown} ${theme}`}>
    <div className={style.bg}></div>

    <h2 style={{textAlign: 'center', marginBottom: '40px'}}>To party left </h2>

    <div className={style.countDownWrapper}>
      <div className={style.countDownBlock}>
        <h2><b>{days}</b></h2>
        <small>days</small>
      </div>
      <div className={style.countDownBlock}>
        <h2><b>{hours}</b></h2>
        <span>hours</span></div>
      <div className={style.countDownBlock}>
        <h2><b>{minutes}</b></h2>
        <span>minutes</span></div>
      <div className={style.countDownBlock}>
        <h2><b>{seconds}</b></h2>
        <span>seconds</span>
      </div>
    </div>
  </section>
}
