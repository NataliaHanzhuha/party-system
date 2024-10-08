// import styles from '@/src/components/JulietPage/juliet-invitation.module.css';
import { Button, Flex } from 'antd';
import Link from 'next/link';

export const firstForm = (
  message: string,
  confirm: () => void,
  cancel: () => void,
  styles: any,
  extra?: any
) => <div className={styles?.firstFormWrapper}>
  <h2 className={styles?.heading}>{message}</h2>

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

export const positiveCancelAnswer = (styles: any) => <div className={styles.notification}>Your Reservation is now cancelled.</div>;

export const finalTmpl = (name: string, id: string, styles: any) => <div style={{alignSelf: 'start', textAlign: 'center'}}>
  <h2>Thank you for your RSVP; see events details below:</h2>
  <p><strong>Address:</strong> London, Baker St, 201, GB</p>
  <p className={styles.dressCode}><strong>Dress code: </strong>Red carpet worthy.</p>
  <p className={styles.details}><strong>Ladies: </strong>Sequined dinner dress.</p>
  <p className={styles.details}><strong>Men: </strong>Black suit.</p>

  <p> To leave a wish for {name}, click
    <Link className={styles.link}
          href={`../../${id}/wishes`}> HERE</Link></p>

  <p>More details have been sent to your email provided</p>
</div>;

export const firstFormReject = (name: string, id: string, styles: any) => <div className={styles.notification}>
  Thank you for your time;
  <span> to leave a wish for {name}, click
    <Link className={styles.link}
          href={`../../${id}/wishes`}> HERE</Link></span>
</div>;
