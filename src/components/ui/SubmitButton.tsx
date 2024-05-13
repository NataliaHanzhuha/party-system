'use client';

import { useEffect, useState } from 'react';
import { Button, Form } from 'antd';

export default function SubmitButton({form, children, saved, styles}: any) {
  const [submittable, setSubmittable] = useState<boolean>(false);
  const values: any = Form.useWatch([], form);

  useEffect(() => {
    setSubmittable(!!values?.name?.trim()?.length && !!values?.email?.trim()?.length);
  }, [form, values]);

  return <div className={styles.formItem}>
    <Button type="primary"
            htmlType="submit"
            className={styles.fullWButton}
            onClick={() => saved()}
            disabled={!submittable}>
      {children}
    </Button>
  </div>;
};
