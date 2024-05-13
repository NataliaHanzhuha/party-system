import { Button, ConfigProvider, Flex } from 'antd';
import styles from './default.module.css';

const Theme = ({children}: any) => {
  return <ConfigProvider
    theme={{
      components: {
        Button: {
          primaryColor: '#868B8E',
          colorPrimary: '#EDE7DC',
          borderRadius: 17,
          colorBgContainerDisabled: '#7b7777',
          colorBorder: '#000',
          colorBgContainer: 'transparent',
          colorError: '#7b7777',
          colorLink: '#bba377',
          colorLinkActive: '#857351',
          colorLinkHover: '#d9bb84',
        },
        Form: {
          labelColor: '#868B8E',
          labelRequiredMarkColor: '#750001',
          colorText: '#868B8E',
        }
      }
    }}>{children}</ConfigProvider>
}

export const CustomThemeWrapper = ({children}: any) => {
  return <div className={styles.page}>
    <div className={styles.formWrapper}>
      <Theme>{children}</Theme>
    </div>
  </div>;
};
