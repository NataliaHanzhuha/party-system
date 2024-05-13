'use client';

import axios from 'axios';
import SubmitButton from '@/src/components/ui/SubmitButton';
import { Form, Input } from 'antd';

export const InvitationForm = ({form, saved, initialValue, styles}: any) => {
  const validateMessages = {
    required: '${name} is required!',
  };

  const saveNewGuest = async () => {
    const guest = await axios.post(
      '/api/guest?clientId=' + form.getFieldValue('clientId'), form.getFieldsValue());
    saved(guest);
  };

  const editGuest = async () => {
    const id = form.getFieldValue('id');
    const guest = await axios.patch(
      '/api/guest?id=' + id + '&clientId=' + form.getFieldValue('clientId'), form.getFieldsValue());
    saved(guest);
  };

  const submit = () => {
    form.getFieldValue('id')
      ? editGuest()
      : saveNewGuest();
  };
  return <Form form={form}
               validateMessages={validateMessages}
               initialValues={initialValue}
               name="validateOnly"
               layout="vertical"
               autoComplete="off">
    <Form.Item name="name"
               label="Full Name"
               className={styles.label}
               rules={[{required: true}]}>
      <Input type="text"
             className={styles.field}/>
    </Form.Item>

    <Form.Item name="email"
               className={styles.label}
               label="Email"
               rules={[{required: true}]}>
      <Input type="email"
             className={styles.field}/>
    </Form.Item>

    <Form.Item name="extraPerson1"
               className={styles.label}
               label="Full Name of your additional Guest (1 person only)">
      <Input type="text"
             className={styles.field}/>
    </Form.Item>

    <Form.Item>
      <SubmitButton form={form}
                    styles={styles}
                    saved={submit}>RSVP</SubmitButton>
    </Form.Item>

    <p style={{textAlign: 'center'}}>This event is strictly by Invitation</p>
  </Form>;
};
