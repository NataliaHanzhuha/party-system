// import styles from '@/src/components/JulietPage/juliet-invitation.module.css';
import { Flex, Typography } from 'antd';
import Link from 'next/link';
import styles from '@/src/app/(public)/e/[domain]/(styles)/rsvp.module.css';
import { ReactNode } from 'react';
import CustomButton from '@/src/app/(public)/e/[domain]/(components)/Button';

// const Theme = ({children}: any) => {
//   return <ConfigProvider
//     theme={{
//       components: {
//         Button: {
//           primaryColor: '#000',
//           colorPrimary: '#bba377',
//           borderRadius: 17,
//           colorBgContainerDisabled: '#7b7777',
//           colorBorder: '#000',
//           colorBgContainer: 'transparent',
//           colorError: '#7b7777',
//           colorLink: '#bba377',
//           colorLinkActive: '#857351',
//           colorLinkHover: '#d9bb84',
//         },
//         Input: {
//           activeBg: '#ffffff00',
//           activeBorderColor: '#fff',
//           hoverBg: 'transparent',
//           hoverBorderColor: '#000',
//           borderRadius: 17,
//           colorError: '#750001',
//         },
//         Form: {
//           labelColor: '#000',
//           labelRequiredMarkColor: '#750001',
//           colorText: '#000',
//           fontFamily: 'Montserrat'
//         }
//       }
//     }}>
//     {children}
//   </ConfigProvider>;
// };

// export const CustomThemeWrapper = ({children}: any) => {
//   return <div className={styles.page}>
//     <div className={styles.formWrapper}>
//       <Theme>{children}</Theme>
//     </div>
//   </div>;
// };

export const finalTmpl = (name: string, domain: string, details: ReactNode) => <div className={styles.container + ' gap-30'}>
  <h3>Thank you for your RSVP; see events details below:</h3>
  {details}
  <p className={"plead"}>To leave a wish for <b>{name}</b>, click</p>

  <WishButton domain={domain}/>

  <p className={"plead"}>More details have been sent to your email provided</p>
</div>;

export function WishButton({domain}: { domain: string }) {
  const path = '/e/' + domain;
  return <CustomButton classes={'fullWidth primary'}>
    <Link href={`${path}/wish-form`}>WISH HERE</Link>
  </CustomButton>;
}

export const firstFormReject = (name: string, domain: string) => <div className={styles.container}>
  <h3>Thank you for your time;</h3>
  <p className="plead"> to leave a wish for {name}, click
  </p>
  <WishButton domain={domain}/>
</div>;


export const firstForm = (
  message: string,
  confirm: () => void,
  cancel: () => void,
  extra?: ReactNode
) => <div className={styles.container}>
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
  <h3>Your Reservation is now cancelled.</h3>
</div>;
