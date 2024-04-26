import styles from '@/components/JulietPage/juliet-invitation.module.css';
import { Button, ConfigProvider, Flex, Form, Input } from 'antd';

const Theme = ({children}: any) => {
  return <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimary: '#bba377',
          borderRadius: 17,
          colorBgContainerDisabled: '#7b7777',
          colorBorder: '#fff',
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
          labelColor: '#fff',
          labelRequiredMarkColor: '#750001',
          colorText: '#fff'
        }
      }
    }}>
    {children}
  </ConfigProvider>
}

export const CustomThemeWrapper = ({children}: any) => {
  return <div className={styles.page}>
    <div className={styles.formWrapper}>
      <Theme>{children}</Theme>
    </div>
  </div>;
}

export const finalTmpl = (name: string) => <div style={{alignSelf: 'start'}}>
  <h2>Thank you for your RSVP; see events details below:</h2>
  <p><strong>Address:</strong> Scarpetta at Riviera Hotel, 3525 26th Street NE, T1Y7E3</p>
  <p className={styles.dressCode}><strong>Dress code: </strong>Red carpet worthy.</p>
  <p className={styles.details}><strong>Ladies: </strong>Evening gown.</p>
  <p className={styles.details}><strong>Men: </strong>Black suit.</p>

  <p> You can leave your wish for {name} by
    <a className={styles.link}
       href={'#'}> this link</a>.</p>

  <p><i>More details have been sent to your email provided</i></p>
</div>;

export const firstFormReject = (name: string) => <div>
  <h2 className={styles.heading}>Thanks for your time</h2>
  <p> You can leave your wish for {name} by
    <a className={styles.link}
       href={'#'}> this link</a>.</p>
</div>;

export const firstForm = (
  message: string,
  confirm: () => void,
  cancel: () => void
) => <div className={styles.firstFormWrapper}>
  <h2 className={styles.heading}>{message}</h2>

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
