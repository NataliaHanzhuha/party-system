'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Button, Form, Input, notification } from 'antd';
import { redirect } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({message: 'Email is required.'}),
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
  const [api, contextHolder] = notification.useNotification();
  const {data: session, update, status} = useSession();

  useEffect(() => {
    if (!!session?.client?.id) {
      redirect('/celebrant/dashboard');
    }
  }, [session?.client?.id]);

  const openNotificationWithIcon = (error: string) => {
    api['error']({message: 'Auth error', description: error,});
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<Login>({
    // resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    setIsLoading(true);
    const res = await signIn('client', {
      email: values.email,
      password: values.password,
      callbackUrl: `/celebrant/dashboard`,
      redirect: true,
    });
    if (res?.error) {
      openNotificationWithIcon(res.error);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      await update({...values});
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
