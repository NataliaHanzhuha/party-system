'use client';

import axios from 'axios';
import useSWR from 'swr';
import Link from 'next/link';
import ClientEditForm from '@/src/components/ClientEditForm';
import { Client, Guest } from '@prisma/client';
import { Badge, Button, Divider, Dropdown, Flex, Modal, Space, Table, Tag, Typography } from 'antd';
import { FileExcelOutlined, IdcardOutlined, UnorderedListOutlined, UserAddOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
export default function ClientTable({id}: {id: string}) {
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const {data, error, isLoading, mutate} = useSWR('/api/client?id=' + id, fetcher);

  if (!isLoading && !data?.id) {
    return 'no client yet';
  }

  const getEmailWIthGuests = async () => {
    await axios.get('/api/client/list?id=' + id);
  };

  const items: MenuProps['items'] = [
    {
      key: '3',
      label: (<Space>
        <UserAddOutlined/>
        <Link href={`../../${data?.id}/invitation`}>Go to Add guest</Link>
      </ Space>)
    },
    {
      key: '4',
      label: (<Space>
        <IdcardOutlined/>
        <Link href={`../../${data?.id}/wishes`}>Go to Add Wish</Link>
      </Space>)
    },
    {
      type: 'divider',
    },
    {
      key: '1',
      label: (
        <Space>
          <UnorderedListOutlined/>
          <Link href={`../../${data?.id}/wishes/list`}>Go to Wish list</Link>
        </Space>
      ),
    },
    {
      key: '2',
      label: (
        <Space>
          <FileExcelOutlined/>
          <span onClick={getEmailWIthGuests}>Download list of guests</span>
        </Space>),
    },
  ];

  const header = () => {
    return <Flex gap="middle"
                 vertical={false}
                 style={{width: '100%'}}
                 align={'center'}
                 justify={'space-between'}>
      <Typography.Title level={2}
             style={{margin: 0, flex: 1}}>
        Celebrant: {!isLoading && <>{data ? data?.name : id}</>}
      </Typography.Title>

      <div>Guests: {data?.guests?.length ?? 0}</div>

      <Button onClick={info}>Info</Button>

      <Dropdown.Button placement="bottom"
                       style={{width: 'auto'}}
                       arrow={{pointAtCenter: true}}
                       menu={{items}}>Actions</Dropdown.Button>
    </Flex>;
  };

  const info = () => {
    const modal = Modal.info({
      title: 'Client Data',
      icon: null,
      width: '600px',
      closable: true,
      content: <ClientEditForm client={data}
                               close={() => modal.destroy()}
                               update={async (value: Client) => {
                                 let s = await axios.put('/api/client?id=' + id, value);
                                 await mutate(s);
                                 modal.destroy();
                               }}/>,
      footer: null
    });
  };

  return <>
    <Table dataSource={data?.guests}
           size="small"
           bordered={true}
           loading={isLoading}
           scroll={{y: 500}}
           style={{marginTop: '10px'}}
           pagination={{position: ['bottomRight']}}
           title={header}
           rowKey="id"
           virtual>
      <Table.Column title="Name"
                    key="name"
                    dataIndex="name"/>
      <Table.Column title="Extra Guest"
                    key="extraPerson1"
                    dataIndex="extraPerson1"
                    render={(value: string) => {
                      const isInvalid = value?.trim()?.includes('\s[2,]') || value?.trim()?.includes(', ');

                      return isInvalid
                        ? <Badge.Ribbon color="volcano"
                                        text="Invalid"
                                        style={{marginTop: '-30px'}}>
                          <div style={{marginTop: '5px'}}>{value} </div>
                        </Badge.Ribbon>
                        : value;
                    }}/>
      <Table.Column title="Email"
                    key="email"
                    dataIndex="email"/>
      <Table.Column title="Status"
                    key="status"
                    align={'center'}
                    render={(value: string) => {
                      const arr = ['NEW', 'EDITED', 'REJECTED'];
                      const colors = ['blue', 'purple', 'volcano'];

                      return <Tag color={colors[arr.indexOf(value)]}>{value}</Tag>;
                    }}
                    dataIndex="status"/>
      <Table.Column dataIndex=""
                    key="action"
                    render={(value: Guest) => <>
                      <Link href={`../../${data?.id}/invitation/${value?.id}`}>Edit</Link>
                      <Divider type="vertical"/>
                      <Link href={`../../${data?.id}/cancel/${value?.id}`}>Cancel</Link>

                    </>}/>
    </Table>
  </>;
}
