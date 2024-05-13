'use client';

import { Button, Form, Input } from 'antd';

const initialForm = {
  text: null,
  name: null
};

export default function WishPage({sendWish, styles}: any) {
  const [form] = Form.useForm();

  return <Form form={form}
               style={{width: '100%'}}
               initialValues={initialForm}
               name="validateOnly"
               layout="vertical"
               autoComplete="off">

    <Form.Item name="text"
               label="Your Wish"
               className={styles?.label}
               rules={[{required: true}]}>
      <Input.TextArea rows={6}
                      className={styles?.field}/>
    </Form.Item>

    <Form.Item name="name"
               label="Your Name"
               className={styles?.label}>
      <Input type="text"
             className={styles?.field}/>
    </Form.Item>

    <Form.Item>
      <div className={styles?.formItem}>
        <Button type="primary"
                htmlType="submit"
                className={styles?.fullWButton}
                onClick={() => {
                  sendWish({
                    text: form.getFieldValue('text'),
                    name: form.getFieldValue('name')
                  });
                }}>
          Send Wish
        </Button>
      </div>
    </Form.Item>
  </Form>;
}
