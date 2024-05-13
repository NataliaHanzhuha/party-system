'use client';

import { MehTwoTone } from '@ant-design/icons';
import { Flex, Result } from 'antd';

export default function NotFound() {
  return <Flex gap="middle"
               justify={'center'}
               style={{height: '100vh'}}
               vertical>
    <Result icon={<MehTwoTone/>}
            title="Opps! It looks like no data for this page"/>
  </Flex>;
}
