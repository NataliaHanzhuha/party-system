'use client';

import Login from '@/src/components/login';
import { Card, Flex, Typography } from 'antd';

export default function Page() {
  return <Flex gap="middle"
               style={{height: '100vh'}}
               align="center"
               justify="center"
               vertical>
    <Card style={{minWidth: 400}}>
      <Typography.Title level={2}
                        style={{textAlign: 'center'}}
                        type="secondary">Login Page</Typography.Title>
      <Login redirectPath={'/clients'}
             provider={'admin'}/>
    </Card>
  </Flex>;
}
