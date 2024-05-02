import { CustomThemeWrapper } from '@/src/components/JulietPage/elements';
import { Button, Form, Input } from 'antd';
import styles from '@/components/JulietPage/juliet-invitation.module.css';
import { Wish } from '@prisma/client';
import axios from 'axios';
import { ReactNode, useState } from 'react';

export default function JulietWishForm({data}: any): ReactNode {
  const [isSentWish, sent] = useState<Wish | null>(null);

  const [form] = Form.useForm();
  const initialForm = {
    text: null,
    name: null
  };
  const sendWish = async () => {
    const obj = {
      text: form.getFieldValue('text'),
      name: form.getFieldValue('name')?.trim() ?? 'Anonim',
      clientId: data?.id
    }
    const wish: Wish = await axios.post('/api/wish?clientId=' + data?.id, obj);

    sent(wish);
  };

  const WishForm = <Form form={form}
                         style={{width: '100%'}}
                         initialValues={initialForm}
                         name="validateOnly"
                         layout="vertical"
                         autoComplete="off">

    <Form.Item name="text"
               label="Your Wish"
               className={styles.label}
               rules={[{required: true}]}>
      <Input.TextArea rows={6}
                      className={styles.field}/>
    </Form.Item>

    <Form.Item name="name"
               label="Your Name"
               className={styles.label}>
      <Input type="text"
             className={styles.field}/>
    </Form.Item>

    <Form.Item>
      <div className={styles.formItem}>
        <Button type="primary"
                htmlType="submit"
                className={styles.fullWButton}
                onClick={sendWish}>
          Send Wish
        </Button>
      </div>
    </Form.Item>
  </Form>
;

return<CustomThemeWrapper>
    {
      isSentWish
        ? <div className={styles.notification}>Thank you; your wish has been sent.</div>
        : <>
          <h2 style={{textAlign: 'center'}}>Leave your wish for {data?.name}</h2>
          {WishForm}
        </>
    }
  </CustomThemeWrapper>;
}
