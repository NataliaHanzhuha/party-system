'use client';

import type { FormInstance } from 'antd';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import styles from './juliet-invitation.module.css';
import axios from 'axios';
import { Guest } from '@prisma/client';
import { CustomThemeWrapper, finalTmpl, firstForm, firstFormReject } from '@/components/JulietPage/elements';

interface SubmitButtonProps {
  form: FormInstance;
  saved: Function;
  initialValue?: any;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({form, children, saved}) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    setSubmittable(!!values?.name?.trim()?.length && !!values?.email?.trim()?.length);
  }, [form, values]);

  return (
    <Button type="primary"
            htmlType="submit"
            className={styles.fullWButton}
            onClick={() => saved()}
            disabled={!submittable}>
      {children}
    </Button>
  );
};

const InvitationForm: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({form, saved, initialValue}) => {
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
    <Form.Item name="extraPerson"
               className={styles.label}
               label="Extra person Name">
      <Input type="text"
             className={styles.field}/>
    </Form.Item>
    <Form.Item>
      <SubmitButton form={form}
                    saved={submit}>RSVP</SubmitButton>
    </Form.Item>
  </Form>;
};

export default function JulietInvitation({data}: any) {
  const [form] = Form.useForm();
  const initialValue = {
    name: data?.name ?? '',
    email: data?.email ?? '',
    extraPerson: data?.extraPerson ?? undefined,
    clientId: data?.client?.id,
    id: data?.id ?? null
  };
  const [agreedForRSVP, isAgreed] = useState<boolean | null>(null);
  const [isSavedGuest, setSavedGuest] = useState<Guest | null>(null);
  const message = `You are cordially Invited to ${data?.client?.name}'s 50th birthday party (28.09.2024)`;

  const formTmp = <div>
    <h2 className={styles.heading}>{message}</h2>

    <InvitationForm form={form}
                    initialValue={initialValue}
                    saved={(guest: Guest) => setSavedGuest(guest)}/>
  </div>;

  const firstFormView = agreedForRSVP === null
    ? firstForm(message, () => isAgreed(true), () => isAgreed(false))
    : agreedForRSVP
      ? formTmp
      : firstFormReject(data?.client?.name);

  return <CustomThemeWrapper>
    {isSavedGuest
      ? finalTmpl(data?.client?.name)
      : !data?.id ? firstFormView : formTmp}
  </CustomThemeWrapper>;
}
