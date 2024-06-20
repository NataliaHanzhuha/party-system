'use client';

import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import styles from '../(styles)/mm.module.css';
import axios from 'axios';
import { useClientContext } from '@/src/app/(public)/e/[domain]/(layout)/MediaManagerLayout';

const initialValue = {
  name: '',
  email: ''
};

export default function MediaForm({sent}) {

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  const [submittable, setSubmittable] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const client = useClientContext();

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true, dirty: true })
      .then(() => setSubmittable(false))
      .catch(() => setSubmittable(true));
  }, [form, values]);

  const saveNewGuest = async () => {
    setLoading(true);
    const guest = await axios.post(
      '/api/guest?clientId=' + client?.id, form.getFieldsValue());
    sent(true);
  };

  return <Form
    form={form}
    name="basic"
    layout="vertical"
    size={'large'}
    style={{maxWidth: '600px', minWidth: '300px', width: '100%'}}
    initialValues={initialValue}
    autoComplete="off"
    onFinish={saveNewGuest}
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[{required: true, message: 'Please input your email!', type: 'email'}]}>
      <Input type="email"
             size={'large'}/>
    </Form.Item>

    <Form.Item
      label="Full Name"
      name="name">
      <Input size={'large'}/>
    </Form.Item>

    <Form.Item>
      <Button size={'large'}
              disabled={submittable}
              className={styles.button}
              loading={loading}
              htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>;
}
