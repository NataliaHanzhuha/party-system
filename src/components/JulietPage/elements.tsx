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

export const finalTmpl = (name: string, id: string) => <div style={{alignSelf: 'start'}}>
  <p>Just a quick reminder that <u><i>Juliet&#39;s 50th birthday</i></u> celebration is almost here! If you can’t attend, please click cancel
     reservation.<br/></p>
  <p><b>Date:</b> Saturday, September 28th, 2024<br/><b>Time:</b> 5:00 PM PROMT</p>
  <p><b>Venue:</b> Scarpetta at the Riviera 3525 26th Street NE Calgary, AB T1Y7E3 Canada<br/></p>
  <p><b>Dress Code:</b> Red Carpet Worthy<br/><b>Women:</b> Sequined dinner dress<br/><b>Men:</b> Black Suit</p>
  <p>It&#39;s an <u>Adult only</u> party<br/></p>
  <p>We request <u>no boxed gifts</u> — only <i>envelopes</i> and <i>spraying.</i><br/></p>
  <p>Looking forward to celebrating with you!<br/></p>
  <i>Cheers,<br/>Juliet Ogbu-Oraelosi and Family</i>
  <hr />

  <p> To leave a wish for Juliet, click
    <Link className={styles.link}
          href={`../../${id}/wishes`}> HERE</Link></p>
</div>;

export const firstFormReject = (name: string, id: string) => <div className={styles.notification}>
  Thank you for your time;
  <span> to leave a wish for {name}, click
    <Link className={styles.link}
          href={`../../${id}/wishes`}> HERE</Link></span>
</div>;

export const rsvpFinishedBanner = (name: string) => <div className={styles.notification}>
  <h3>Sorry, RSVP for {name}&#39;s party has already finished.</h3>
  <p>Thank you for your time</p>
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
