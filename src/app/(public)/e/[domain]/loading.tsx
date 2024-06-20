'use client';

import { Flex, Spin } from 'antd';
import styles from './(styles)/mm.module.css';

export default function Loading() {
  return <Flex gap="middle"
               align="center"
               vertical
               className={styles.loading}
               justify="center">
    <Spin size="large"/>
  </Flex>;
}
