'use client';

import type { FormInstance } from 'antd';
import { Button, ConfigProvider, Flex, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import styles from './juliet-invitation.module.css';

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
    console.log(values);
    // form
    //   .validateFields({validateOnly: true})
    //   .then(() => setSubmittable(true))
    //   .catch(() => setSubmittable(false));
    setSubmittable(!!values?.name?.trim()?.length && !!values?.email?.trim()?.length);
  }, [form, values]);

  return (
    <Button type="primary"
            htmlType="submit"
            className={styles.fullWButton}
            onClick={() => {
              console.log(form.getFieldsValue());
              saved();
            }}
            disabled={!submittable}>
      {children}
    </Button>
  );
};

const InvitationForm: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({form, saved, initialValue}) => {
  const validateMessages = {
    required: '${name} is required!',
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
                    saved={saved}>RSVP</SubmitButton>
    </Form.Item>
  </Form>;
};

export default function JulietInvitation({data}: any) {
  const [form] = Form.useForm();
  const initialValue = {
    name: data?.name ?? '',
    email: data?.email ?? '',
    extraPerson: data?.extraPerson ?? undefined
  };
  const [agreedForRSVP, isAgreed] = useState<boolean | null>(null);
  const [isSavedGuest, setSavedGuest] = useState<boolean | null>(null);

  const formTmp = <div>
    <h2 className={styles.heading}>You are cordially Invited to {data?.client?.name}&#39;s 50th birthday party (28.09.2024)</h2>

    <InvitationForm form={form}
                    initialValue={initialValue}
                    saved={() => setSavedGuest(true)}/>
  </div>;

  const firstForm = <div className={styles.firstFormWrapper}>
    <h2 className={styles.heading}>You are cordially Invited to {data?.client?.name}&#39;s 50th birthday party (28.09.2024)</h2>

    <Flex wrap="wrap"
          gap="small">
      <Button type="primary"
              size="large"
              onClick={() => isAgreed(true)}>
        Yes
      </Button>
      <Button type="primary"
              size="large"
              danger
              onClick={() => isAgreed(false)}>No</Button>
    </Flex>
  </div>;

  const firstFormReject = <div>
    <h2 className={styles.heading}>Thanks for your time</h2>
    <p> You can leave your wish for {data?.client?.name} by
      <a className={styles.link}
         href={'#'}> this link</a>.</p>
  </div>;

  const finalTmpl = <>
    <h2>Thank you for your RSVP; see events details below:</h2>
    <p><strong>Address:</strong> Scarpetta at Riviera Hotel, 3525 26th Street NE, T1Y7E3</p>
    <p className={styles.dressCode}><strong>Dress code: </strong>Red carpet worthy.</p>
    <p className={styles.details}><strong>Ladies: </strong>Evening gown.</p>
    <p className={styles.details}><strong>Men: </strong>Black suit.</p>


    <p> You can leave your wish for {data?.client?.name} by
      <a className={styles.link} href={'#'}> this link</a>.</p>

    <p><i>More details have been sent to your email provided</i></p>
  </>;

  const firstFormView = agreedForRSVP === null
    ? firstForm
    : agreedForRSVP === true
      ? formTmp
      : firstFormReject;


  return <div className={styles.page}>
    <div className={styles.formWrapper}>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: '#bba377',
              borderRadius: 17,
              colorBgContainerDisabled: '#7b7777',
              colorBorder: '#fff',
              colorBgContainer: 'transparent',
              colorError: '#7b7777',
              colorLink: '#bba377',
              colorLinkActive: '#857351',
              colorLinkHover: '#d9bb84',
            },
            Input: {
              activeBg: '#ffffff00',
              activeBorderColor: 'white',
              hoverBg: 'transparent',
              hoverBorderColor: 'black',
              borderRadius: 17,
              colorError: '#750001',
            },
            Form: {
              labelColor: '#fff',
              labelRequiredMarkColor: '#750001',
              colorText: '#fff'
            }
          }
        }}
      >
        {isSavedGuest
          ? finalTmpl
          : !data?.id ? firstFormView : formTmp}
      </ConfigProvider>
    </div>
  </div>;
}
