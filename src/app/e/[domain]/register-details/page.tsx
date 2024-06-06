'use client';
import React, { useCallback, useState } from 'react';
import type { FormProps, MenuProps, StepProps } from 'antd';
import { Button, Dropdown, Flex, Form, Input, Layout, Steps, theme, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { CalendarOutlined, GoogleOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';

type FieldType = {
  username?: string;
  email?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const initialValue = {
  username: '',
  email: ''
};

const form = () => <Form
  name="basic"
  layout="vertical"
  style={{maxWidth: '600px', minWidth: '300px', width: '100%'}}
  initialValues={initialValue}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}
  autoComplete="off"
>
  <Form.Item>
    <Typography.Title level={4}>
      Guest details
    </Typography.Title>
  </Form.Item>
  <Form.Item<FieldType>
    label="Full Name"
    name="username"
    rules={[{required: true, message: 'Please input your full name!'}]}
  >
    <Input/>
  </Form.Item>

  <Form.Item<FieldType>
    label="Email"
    name="email"
    rules={[{required: true, message: 'Please input your email!'}]}
  >
    <Input type="email"/>
  </Form.Item>

  <Form.Item>
    <Button type="primary"
            htmlType="submit">
      Submit
    </Button>
  </Form.Item>
</Form>;

const items: MenuProps['items'] = [
  {
    key: '1',
    icon: (<GoogleOutlined/>),
    label: (
      <a target="_blank"
         rel="noopener noreferrer"
         href="#">
        Google <i>(online)</i>
      </a>
    ),
  },
];

const confirmation = () => {
  return <div>
    <Flex gap="middle"
          vertical
          wrap="wrap"
          justify={'center'}
          align={'start'}>
      <Typography.Title level={3}>Thank you</Typography.Title>
      <Typography.Text>Thank you for your response. Your response has been sent to the event organizer.</Typography.Text>
      <Dropdown menu={{items}}>
        <Button icon={<CalendarOutlined/>}
                size="large">Add to Calendar</Button>
      </Dropdown>
    </Flex>

  </div>;
};


const {Header, Content, Footer, Sider} = Layout;
const steps: (StepProps & { content: any })[] = [
  {
    title: 'Home',
    content: 'First-content',
    status: 'finish',
    icon: <HomeOutlined/>
  },
  {
    title: 'Details',
    content: form(),
    status: 'process',
    icon: <UserOutlined/>,
  },
  {
    title: 'Confirmation',
    content: confirmation(),
    status: 'wait',
    icon: <UserOutlined/>,
  },
];

export default function Page({params}: any) {
  const {token} = theme.useToken();
  const [current, setCurrent] = useState(1);
  const router = useRouter();

  const redirectBack = useCallback(() => {
    router.back();
  }, [router]);

  const onChange = (value: number) => {
    if (!value) {
      setCurrent(value);
      redirectBack();
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({key: item.title, title: item.title}));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    // color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    // borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    display: 'flex',
    justifyContent: 'center',
    margin: '24px 16px 0',
    backgroundColor: '#fff'
  };

  return <Layout style={{height: '100vh'}}>
    <Header style={{padding: '0 15px', background: token.colorBgContainer}}>
      <Flex gap="middle"
            vertical={false}
            wrap="nowrap"
            justify={'center'}
            align={'center'}>
        <Typography.Title level={4}
                          style={{margin: '0'}}>
          Registration
        </Typography.Title>
        <Steps current={current}
               size="small"
               type="navigation"
               style={{flex: 1}}
               items={items}
               onChange={onChange}/>
      </Flex>
    </Header>

    <Content style={contentStyle}>{steps[current].content}</Content>

    <Footer style={{textAlign: 'center'}}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  </Layout>;
}
