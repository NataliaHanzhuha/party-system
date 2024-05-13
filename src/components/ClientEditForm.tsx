import { Client } from '@prisma/client';
import { Button, Form, Input, Select, Space } from 'antd';
import { useEffect } from 'react';

const {Option} = Select;

const layout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18},
};

interface ClientFormInterface {
  client: Client;
  update: Function;
  close: Function;
}

const pageOptions = [
  'DEFAULT',
  'JULIETPAGE'
];

const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};

export default function ClientEditForm({client, update, close}: ClientFormInterface) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({...client});
  }, [client]);

  const onFinish = (values: any) => {
    update(values);
  };

  const onReset = () => {
    form.resetFields();
    close(null);
  };

  return (
    <Form
      {...layout}
      form={form}
      labelWrap
      wrapperCol={{flex: 1}}
      colon={false}
      onFinish={onFinish}
      name="control-hooks"
    >
      <Form.Item name="name"
                 label="Client Name"
                 rules={[{required: true}]}>
        <Input/>
      </Form.Item>

      <Form.Item name="email"
                 label="Email"
                 rules={[{required: true}]}>
        <Input type={'email'}/>
      </Form.Item>

      <Form.Item name="invitationPage"
                 label="Invitation Page">
        <Select
          placeholder="Select a page type"
          onChange={(value: string) => {
            form.setFieldValue('invitationPage', value);
          }}
        >
          {pageOptions.map((option: string, index: number) => <Option key={index}
                                                                      value={option}>{option}</Option>)}
        </Select>
      </Form.Item>

      {/*<Form.Item name={['EmailTemplateDetails', 'mediaEmailId']}*/}
      {/*           label="Media Email ID">*/}
      {/*  <Input type={'text'}/>*/}
      {/*</Form.Item>*/}

      {/*<Form.Item name={['EmailTemplateDetails', 'invitationEmailId']}*/}
      {/*           label="Invitation Email ID">*/}
      {/*  <Input type={'text'}/>*/}
      {/*</Form.Item>*/}

      <Form.Item {...tailLayout}>
        <Space>
          <Button htmlType="button"
                  onClick={onReset}>
            Reset
          </Button>
          <Button type="primary"
                  htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>

  );
}
