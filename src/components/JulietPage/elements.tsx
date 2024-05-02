import styles from '@/src/components/JulietPage/juliet-invitation.module.css';
import { Button, ConfigProvider, Flex } from 'antd';
import Link from 'next/link';

const Theme = ({children}: any) => {
  return <ConfigProvider
    theme={{
      components: {
        Button: {
          primaryColor: '#000',
          colorPrimary: '#bba377',
          borderRadius: 17,
          colorBgContainerDisabled: '#7b7777',
          colorBorder: '#000',
          colorBgContainer: 'transparent',
          colorError: '#7b7777',
          colorLink: '#bba377',
          colorLinkActive: '#857351',
          colorLinkHover: '#d9bb84',
        },
        Input: {
          activeBg: '#ffffff00',
          activeBorderColor: '#fff',
          hoverBg: 'transparent',
          hoverBorderColor: '#000',
          borderRadius: 17,
          colorError: '#750001',
        },
        Form: {
          labelColor: '#000',
          labelRequiredMarkColor: '#750001',
          colorText: '#000',
          fontFamily: 'Montserrat'
        }
      }
    }}>
    {children}
  </ConfigProvider>;
};

export const CustomThemeWrapper = ({children}: any) => {
  return <div className={styles.page}>
    <div className={styles.formWrapper}>
      <Theme>{children}</Theme>
    </div>
  </div>;
};

export const finalTmpl = (name: string, id: string) => <div style={{alignSelf: 'start', textAlign: 'center'}}>
  <h2>Thank you for your RSVP; see events details below:</h2>
  <p><strong>Address:</strong> Scarpetta at Riviera Hotel, 3525 26th Street NE, T1Y7E3</p>
  <p className={styles.dressCode}><strong>Dress code: </strong>Red carpet worthy.</p>
  <p className={styles.details}><strong>Ladies: </strong>Sequined dinner dress.</p>
  <p className={styles.details}><strong>Men: </strong>Black suit.</p>

  <p> To leave a wish for {name}, click
    <Link className={styles.link}
          href={`../../${id}/wishes`}> HERE</Link></p>

  <p>More details have been sent to your email provided</p>
</div>;

export const firstFormReject = (name: string, id: string) => <div className={styles.notification}>
  Thank you for your time;
  <span> to leave a wish for {name}, click
    <Link className={styles.link}
          href={`../../${id}/wishes`}> HERE</Link></span>
</div>;

export const firstForm = (
  message: string,
  confirm: () => void,
  cancel: () => void,
  extra?: any
) => <div className={styles.firstFormWrapper}>
  <h2 className={styles.heading}>{message}</h2>

  {extra}
  <Flex wrap="wrap"
        gap="small">
    <Button type="primary"
            size="large"
            onClick={confirm}>
      Yes
    </Button>
    <Button type="primary"
            size="large"
            danger
            onClick={cancel}>No</Button>
  </Flex>
</div>;

export const positiveCancelAnswer = <div className={styles.notification}>Your Reservation is now cancelled.</div>;
