import { ThemeType } from '@/src/app/(settings)/constant';
import style from '@/src/app/(public)/e/[domain]/(styles)/domain.module.css';

export default function useTheme(mode: ThemeType) {
  switch (mode) {
    case ThemeType.light: {
      return 'light';
    }
    case ThemeType.dark: {
      return 'dark';
    }
    case ThemeType.red:
      return 'red';
  }
}
