'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormProps, useForm } from 'react-hook-form';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input } from 'antd';

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
}

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

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

      setError(res?.error);
      setIsLoading(false);
    } else {
      router.push('/clients');
    }
  };

  // @ts-ignore
  const onFinishFailed: FormProps<any>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      {...form}
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      style={{maxWidth: 600}}
      initialValues={{remember: true}}
      onFinish={onSubmit}
      onFinishFailed={onFinishFailed}
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

      {error && <p>{error}</p>}

      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Button type="primary"
                loading={isLoading}
                htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
    //     <div className="grid gap-1">
    //       <FormField
    //         control={form.control}
    //         name="email"
    //         render={({ field }) => (
    //           <FormItem>
    //             <FormLabel>Email</FormLabel>
    //             <FormControl>
    //               <Input
    //                 type="email"
    //                 placeholder="name@example.com"
    //                 {...field}
    //               />
    //             </FormControl>
    //             <FormDescription className="text-xs italic">
    //               Enter your email.
    //             </FormDescription>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //     </div>
    //     <div className="grid gap-1">
    //       <FormField
    //         control={form.control}
    //         name="password"
    //         render={({ field }) => (
    //           <FormItem>
    //             <FormLabel>Password</FormLabel>
    //             <FormControl>
    //               <Input type="password" placeholder="*******" {...field} />
    //             </FormControl>
    //             <FormDescription className="text-xs italic">
    //               Enter your password.
    //             </FormDescription>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //     </div>
    //
    //     {error && (
    //       <Alert variant="destructive">
    //         <AlertCircle className="h-4 w-4" />
    //         <AlertDescription>{error}</AlertDescription>
    //       </Alert>
    //     )}
    //
    //     <Button disabled={isLoading} type="submit">
    //       {isLoading && <Spinner />} Login
    //     </Button>
    //   </form>
    // </Form>
  );
}
