import { Flex, Spin, ConfigProvider } from 'antd';

export default function Loading({backgroundColor = 'black'}: {backgroundColor?: string}) {
  return  <ConfigProvider
    theme={{
      components: {
        Spin: {
          colorPrimary: '#bba377'
        }
      }
    }}>
    <Flex align="center"
          justify="center"
          style={{
            height: '100vh',
            width: '100vw',
            backgroundColor: backgroundColor
          }}
          gap="middle">
      <Spin size="large"/>
    </Flex>
  </ConfigProvider>;
}
