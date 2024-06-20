import { ReactNode } from 'react';

interface IButton {
  children: ReactNode;
  classes: string;
  clicked?: () => void;
  disabled?: boolean;
}

export default function CustomButton({children, classes, clicked, disabled}: IButton) {
  return <button type={'button'}
                 onClick={clicked}
                 disabled={disabled}
                 className={'button ' + classes}>{children}</button>;
}
