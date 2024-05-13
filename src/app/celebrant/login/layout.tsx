'use client';

import { Card, Flex, Typography } from 'antd';

export default function LoginLayout({children}: any) {
  return<Flex gap="middle"
          style={{height: '100vh'}}
          align="center"
          justify="center"
          vertical>
      <Card style={{minWidth: 400}}>
        <Typography.Title level={2}
                          style={{textAlign:'center'}}
                          type="secondary">Celebrant Login</Typography.Title>
        {children}
      </Card>
    </Flex>;
}
