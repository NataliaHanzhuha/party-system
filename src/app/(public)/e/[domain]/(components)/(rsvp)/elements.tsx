import { Flex, Typography } from 'antd';
import Link from 'next/link';
import styles from '@/src/app/(public)/e/[domain]/(styles)/rsvp.module.css';
import { ReactNode } from 'react';
import CustomButton from '@/src/app/(public)/e/[domain]/(components)/Button';
import { wishFormPath } from '@/src/app/router';

export const finalTmpl = (
  name: string, domain: string, details: string, allowedWishes: boolean
) => <div className={styles.container + ' gap-30'}>
  <h3>Thank you for your RSVP; see events details below:</h3>

  <div dangerouslySetInnerHTML={{__html: details}}></div>

  {allowedWishes && <>
    <p className="plead">To leave a wish for <b>{name}</b>, click</p>

    <WishButton domain={domain}/>
  </>
  }

  <p className={'plead'}>More details have been sent to your email provided</p>
</div>;

export function WishButton({domain}: { domain: string }) {
  return <CustomButton classes={'fullWidth primary'}>
    <Link href={wishFormPath(domain)}>WISH HERE</Link>
  </CustomButton>;
}

export const firstFormReject = (name: string, domain: string, allowedWishes: boolean) =>
  <div className={styles.container}>
    <h3>Thank you for your time;</h3>
    {allowedWishes && <>
      <p className="plead">To leave a wish for <b>{name}</b>, click</p>

      <WishButton domain={domain}/>
    </>
    }
  </div>;

export const firstForm = (
  message: ReactNode,
  confirm: () => void,
  cancel: () => void,
  extra?: ReactNode
) =>
  <div className={styles.container}>
    <Typography.Title level={3}>{message}</Typography.Title>

    <>{extra}</>

    <Flex wrap="wrap"
          gap="small">
      <CustomButton classes={'halfWidth primary'}
                    clicked={confirm}>YES</CustomButton>
      <CustomButton classes={'halfWidth danger'}
                    clicked={cancel}>NO</CustomButton>
    </Flex>
  </div>;

export const positiveCancelAnswer = <div className={styles.container}>
  <Typography.Title level={3}>Your Reservation is now cancelled.</Typography.Title>
  </div>;

export const cancelFinal = <div className={styles.container}>
  <Typography.Title level={3}>Thank you for your Confirmation; your Reservation will remain.</Typography.Title>
</div>;
