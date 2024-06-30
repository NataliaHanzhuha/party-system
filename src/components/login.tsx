'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Suspense, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Button, Form, Input, notification } from 'antd';
//
// const formSchema = z.object({
//   email: z.string().email({
//     message: 'Email is required.',
//   }),
//   password: z.string().nonempty({message: 'Password is required'}),
// });

interface Login {
  email: string;
  password: string;
}

const defaultValues: Login = {
  email: '',
  password: '',
};
export default function Login({redirectPath, provider}: any) {
  const {data: session, update, status}: { data: any, update: any, status: string } = useSession();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (error: string) => {
    api['error']({message: 'Auth error', description: error,});
  };

  useEffect(() => {
    if (session?.user) {
      redirect(redirectPath);
    }
  }, [session?.user]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<Login>({
    // resolver: zodResolver(formSchema),
    defaultValues,
  });

  // if (!session) {
  //   return 'empty';
  // }

  const onSubmit = async (values: any): Promise<void> => {
    setIsLoading(true);
    const res = await signIn(provider, {
      email: values.email,
      password: values.password,
      callbackUrl: `/`,
      redirect: false,
    });
    if (res?.error) {
      openNotificationWithIcon(res.error);
      setIsLoading(false);
    } else {
      await update({...values});
      // redirect(redirectPath);
    }
  };

  if (status == 'loading') {
    return <>loading...</>;
  }

  return <Form
        name="basic"
        {...form}
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        style={{maxWidth: 600}}
        initialValues={{remember: true}}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{required: true, message: 'Please input your email!'}]}
        >
          <Input type={'email'}/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{required: true, message: 'Please input your password!'}]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <Button type="primary"
                  loading={isLoading}
                  htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
        {contextHolder}
      </Form>;
}
