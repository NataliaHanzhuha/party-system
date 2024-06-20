'use client';

import { Form } from 'antd';
import { useState } from 'react';
import styles from './juliet-invitation.module.css';
import { Guest } from '@prisma/client';
import { CustomThemeWrapper, finalTmpl, firstForm, firstFormReject, positiveCancelAnswer } from '@/src/components/JulietPage/elements';
import { InvitationForm } from '@/src/components/ui/InvitationForm';

// interface SubmitButtonProps {
//   form: FormInstance;
//   saved: Function;
//   initialValue?: any;
// }
//
// const InvitationForm: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({form, saved, initialValue}) => {
//   const validateMessages = {
//     required: '${name} is required!',
//   };
//
//   const saveNewGuest = async () => {
//     const guest = await axios.post(
//       '/api/guest?clientId=' + form.getFieldValue('clientId'), form.getFieldsValue());
//     saved(guest);
//   };
//
//   const editGuest = async () => {
//     const id = form.getFieldValue('id');
//     const guest = await axios.patch(
//       '/api/guest?id=' + id + '&clientId=' + form.getFieldValue('clientId'), form.getFieldsValue());
//     saved(guest);
//   };
//
//   const submit = () => {
//     form.getFieldValue('id')
//       ? editGuest()
//       : saveNewGuest();
//   };
//   return <Form form={form}
//                validateMessages={validateMessages}
//                initialValues={initialValue}
//                name="validateOnly"
//                layout="vertical"
//                autoComplete="off">
//     <Form.Item name="name"
//                label="Full Name"
//                className={styles.label}
//                rules={[{required: true}]}>
//       <Input type="text"
//              className={styles.field}/>
//     </Form.Item>
//
//     <Form.Item name="email"
//                className={styles.label}
//                label="Email"
//                rules={[{required: true}]}>
//       <Input type="email"
//              className={styles.field}/>
//     </Form.Item>
//
//     <Form.Item name="extraPerson1"
//                className={styles.label}
//                label="Full Name of your additional Guest (1 person only)">
//       <Input type="text"
//              className={styles.field}/>
//     </Form.Item>
//
//     <Form.Item>
//       <SubmitButton form={form}
//                     styles={styles}
//                     saved={submit}>RSVP</SubmitButton>
//     </Form.Item>
//
//     <p style={{textAlign: 'center'}}>This event is strictly by Invitation</p>
//   </Form>;
// };

export default function JulietInvitation({data}: any) {
  const initialValue = {
    name: data?.name ?? '',
    email: data?.email ?? '',
    extraPerson1: data?.extraPerson1 ?? undefined,
    clientId: data?.client?.id,
    id: data?.id ?? null
  };
  const [form] = Form.useForm();
  const [agreedForRSVP, isAgreed] = useState<boolean | null>(null);
  const [isSavedGuest, setSavedGuest] = useState<Guest | null>(null);
  const title = `${data?.client?.name}'s 50th birthday party (28.09.2024)`;
  const message = `You are cordially Invited to ${title}`;
  const formTmp = <div>
    <h2 className={styles.heading}>{title}</h2>

    <InvitationForm form={form}
                    initialValue={initialValue}
                    styles={styles}
                    saved={(guest: Guest) => setSavedGuest(guest)}/>
  </div>;

  const firstFormView = agreedForRSVP === null
    ? firstForm(message, () => isAgreed(true), () => isAgreed(false),
      <h2>Do you want to RSVP?</h2>)
    : agreedForRSVP
      ? formTmp
      : firstFormReject(data?.client?.name, data?.client?.id);

  const view = data?.status === 'REJECTED'
    ? positiveCancelAnswer
    : isSavedGuest
      ? finalTmpl(data?.client?.name, data?.client?.id)
      : !data?.id ? firstFormView : formTmp;

  return <CustomThemeWrapper>{view}</CustomThemeWrapper>;
}
