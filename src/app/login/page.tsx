'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormProps, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { Button, Form, Input, notification } from 'antd';

const formSchema = z.object({
  email: z.string().email({
    message: 'Email is required.',
  }),
  password: z.string().nonempty({message: 'Password is required'}),
});

interface Login {
  email: string;
  password: string;
}

const defaultValues: Login = {
  email: '',
  password: '',
};

export default function LoginForm(): JSX.Element {
  const {data: session, update, status} = useSession();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (error: string) => {
    api['error']({message: 'Auth error', description: error,});
  };

  useEffect(() => {
    if (session?.user) {
      redirect('/clients');
    }
  }, [session?.user]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string>('');
  const router = useRouter();
  const form = useForm<Login>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    setIsLoading(true);
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: `/`,
      redirect: false,
    });
    if (res?.error) {
      // setError(res?.error);
      openNotificationWithIcon(res.error);
      setIsLoading(false);
    } else {
      console.log(res);
      await update({...values});
      router.push('/clients');
    }
  };

  if (status === 'loading') {
    return <>loading...</>;
  }

  return (
    <Form
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
    </Form>
  );
}
