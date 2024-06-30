'use client';

import { useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import styles from '@/src/app/(public)/e/[domain]/(styles)/rsvp.module.css';

export default function SubmitButton({form, children, saved}: any) {
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const values: any = Form.useWatch([], form);

  useEffect(() => {
    setSubmittable(!!values?.name?.trim()?.length && !!values?.email?.trim()?.length);
  }, [form, values]);

  return <div  className={styles.formItem}>
    <Button type="primary"
            htmlType="submit"
            className={'button'}
            style={{width: '100%'}}
            onClick={() => {
              setLoading(true);
              saved();
            }}
            loading={loading}
            disabled={!submittable}>
      {children}
    </Button>
  </div>;
};
