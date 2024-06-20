import { ThemeType } from '@/src/app/(settings)/constant';
import style from '@/src/app/(public)/e/[domain]/(styles)/domain.module.css';
import useTheme from '@/src/app/(public)/e/[domain]/(hooks)/useTheme';

interface FooterProps {
  mode: ThemeType;
}

export default function Footer({mode}: FooterProps) {
  const theme = useTheme(mode);

  return <footer className={`${style.footer} ${theme}`}>
    <div className={style.container}>
      <p>© 2024. All Rights Reserved. </p>
    </div>
  </footer>;
}
