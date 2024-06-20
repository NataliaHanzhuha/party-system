'use client';

import { useState } from 'react';
import { Wish } from '@prisma/client';
import axios from 'axios';
import { Form, Input } from 'antd';
import { useClientContext, usePermitionContext } from '@/src/app/(public)/e/[domain]/(layout)/MediaManagerLayout';
import CustomButton from '@/src/app/(public)/e/[domain]/(components)/Button';
import styles from '../../(styles)/rsvp.module.css';

const initialForm = {
  text: null,
  name: null
};

export default function WishForm() {
  const client: any = useClientContext();
  const permission = usePermitionContext();

  const [isSentWish, sent] = useState<Wish | null>(null);
  const [form] = Form.useForm();
  const text = Form.useWatch('text', form);
  const sendWish = async ({text, name}: any) => {
    const obj = {
      text,
      name: name?.trim() ?? 'Anonim',
      clientId: client?.id
    };
    const wish: Wish = await axios.post('/api/wish?clientId=' + client?.id, obj);

    sent(wish);
  };

  const formElement = <Form form={form}
                            style={{width: '100%'}}
                            className={styles.form}
                            initialValues={initialForm}
                            name="validateOnly"
                            layout="vertical"
                            autoComplete="off">

    <Form.Item name="text"
               label={<label>Your Wish</label>}
               rules={[{required: true}]}>
      <Input.TextArea rows={6}/>
    </Form.Item>

    <Form.Item name="name"
               label={<label>Your Name</label>}>
      <Input type="text"/>
    </Form.Item>

    <CustomButton classes={'w-100'}
                  disabled={!text?.trim()?.length}
                  clicked={() => {
                    sendWish({
                      text: form.getFieldValue('text'),
                      name: form.getFieldValue('name')
                    });
                  }}>Send Wish</CustomButton>
  </Form>;

  return <div className={'container gap-30'}>
    {
      isSentWish
        ? <h3 style={{textAlign: 'center'}}>Thank you; your wish has been sent.</h3>
        : <div className={styles.formWrapper + ' container gap-30'}>
          <h2>Leave your wish for {client?.name}</h2>
          {formElement}
        </div>
    }
  </div>;
}
