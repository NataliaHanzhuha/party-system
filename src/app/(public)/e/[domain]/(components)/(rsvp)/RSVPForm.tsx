'use client';

import axios from 'axios';
import { Form, Input } from 'antd';
import SubmitButton from '@/src/app/(public)/e/[domain]/(components)/(rsvp)/SubmitButton';
import { usePermition } from '@/src/app/(public)/e/[domain]/(hooks)/usePermition';
import { PagesViews } from '@/src/app/(public)/e/[domain]/(settings)/constant';
import { useClientContext } from '@/src/app/(public)/e/[domain]/(layout)/MediaManagerLayout';

export const RSVPForm = ({form, saved, initialValue, styles}: any) => {
  let client: any = useClientContext();
  let permission: any = usePermition(PagesViews.RSVP, client?.settings);

  const validateMessages = {required: '${name} is required!',};

  const saveNewGuest = async () => {
    const guest = await axios.post(
      `/api/guest?clientId=${client?.id}&type=${PagesViews.RSVP}`, form.getFieldsValue());
    saved(guest);
  };

  const editGuest = async () => {
    const id = form.getFieldValue('id');
    const guest = await axios.patch(
      '/api/guest?id=' + id + '&clientId=' + client.id, form.getFieldsValue());
    saved(guest);
  };

  const submit = () => {
    form.getFieldValue('id') ? editGuest() : saveNewGuest();
  };

  return <Form form={form}
               validateMessages={validateMessages}
               initialValues={initialValue}
               style={{width: '100%'}}
               name="validateOnly"
               layout="vertical"
               autoComplete="off">
    <Form.Item name="name"
               label={<label>Full Name</label>}
               rules={[{required: true}]}>
      <Input type="text"
             className={styles.field}/>
    </Form.Item>

    <Form.Item name="email"
               label={<label>Email</label>}
               rules={[{required: true}]}>
      <Input type="email"
             className={styles.field}/>
    </Form.Item>

    <Form.Item name="extraPerson1"
               label={<label>Full Name of your +1 </label>}>
      <Input type="text"
             className={styles.field}/>
    </Form.Item>

    {/*<Form.Item>*/}
      <SubmitButton form={form}
                    saved={submit}>RSVP</SubmitButton>
    {/*</Form.Item>*/}

    {/*<p style={{textAlign: 'center'}}>This event is strictly by Invitation</p>*/}
  </Form>;
};
