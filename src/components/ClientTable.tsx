'use client';

import axios from 'axios';
import useSWR from 'swr';
import Link from 'next/link';
import ClientEditForm from '@/src/components/ClientEditForm';
import { Client, Guest } from '@prisma/client';
import type { MenuProps } from 'antd';
import { Badge, Col, Dropdown, Flex, message, Modal, Row, Space, Statistic, Table, Tag, Typography } from 'antd';
import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  FileExcelOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
  MailOutlined,
  UnorderedListOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { invalidExtraPersonName } from '@/src/utills/invalid-extra-person-name';
import { Roles } from '@/types/types';
import { useState } from 'react';
import { fetcher } from '@/lib/auth/session';
import { usePathname } from 'next/navigation';


export default function ClientTable({id, role, host}: { id: string, role: Roles, host: string }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [isDuplicate, setIsDuplicate] = useState<string[]>([]);
  const {data, error, isLoading, mutate} = useSWR('/api/client?id=' + id, fetcher);
  const pathname = usePathname()

  if (!isLoading && !data?.id) {
    return 'no client yet';
  }

  console.log(pathname);
  const getEmailWIthGuests = async () => {
    await axios.get('/api/client/list?id=' + id);
    messageApi.success('Email with guest list was sent successfully!');
  };


  if (data && !isLoading && !isDuplicate?.length) {
    const valueArr = data.guests?.map((item: Guest) => item.email);
    const d = valueArr?.filter((item: Guest, idx: number) => valueArr?.indexOf(item) != idx)
      ?.concat({email: '1'});
    setIsDuplicate(d);
    console.log(d, isDuplicate);
  }

  const resendEmail = async (guestId: string) => {
    const message = await axios.get('/api/guest/email?id=' + guestId + '&clientId=' + id);
    message
      ? messageApi.success('Invitation email for guest was resent successfully!')
      : messageApi.error('Request failed');
  };

  const isAdmin = role === Roles.Admin;
  const invitationUrl = host + `/${id}/invitation`;
  const wishUrl = host + `/${data?.id}/wishes`;

  const RoledLink = ({title, url, forAll = false}: { title: string, url: string, forAll?: boolean }) => {
    return (<>
      {(forAll || isAdmin) && <Link href={url}>Go to {title} Page</Link>}
      <Typography.Text copyable={{text: url}}>{isAdmin || forAll ? '' : `Copy ${title} Link`}</Typography.Text>
    </>);
  };

  const items: MenuProps['items'] = [
    {
      key: '3',
      label: <Space>
        <UserAddOutlined/>
        <RoledLink title={'Guest Invitation'}
                   url={invitationUrl}/>
      </ Space>
    },
    {
      key: '4',
      label: <Space>
        <IdcardOutlined/>
        <RoledLink title={'Add Wish'}
                   url={wishUrl}/>
      </Space>
    },
    {
      type: 'divider',
    },
    {
      key: '1',
      label: <Space>
        <UnorderedListOutlined/>
        <RoledLink title={'Wishes List'}
                   forAll={true}
                   url={wishUrl + '/list'}/>
      </Space>,
    },
    {
      key: '2',
      label: <Space>
        <FileExcelOutlined/>
        <span onClick={getEmailWIthGuests}>Get email with list of guests</span>
      </Space>,
    }
  ];

  const infoOption: any = {
    key: 'info',
    label: <Space>
      <InfoCircleOutlined/>
      <span onClick={() => info()}>Celebrant Info</span>
    </Space>
  };

  const header = () => {
    let extra = 0;
    let invalidPersonName = 0;
    const extraPersonCount = () => {
      data?.guests?.forEach((guest: Guest) => {
        if (guest?.extraPerson1?.trim()?.length) {
          extra++;
        }

        if (invalidExtraPersonName(guest?.extraPerson1)) {
          invalidPersonName++;
        }
      });
      return `${extra - invalidPersonName} + (${invalidPersonName})`;
    };

    extraPersonCount();

    return <Flex gap="middle"
                 vertical={false}
                 style={{width: '100%'}}
                 align={'center'}
                 wrap={'wrap'}
                 justify={'space-between'}>
      <Typography.Title level={2}
                        style={{margin: 0, flex: 1}}>
        {!isLoading && <>{data ? data?.name : id}</>}
      </Typography.Title>

      <Row gutter={16}
           align={'top'}
           style={{width: '300px'}}>
        <Col span={4}>
          <Statistic title="Guests"
                     value={data?.guests?.length}
                     loading={isLoading}/>
        </Col>
        <Col span={10}>
          <Statistic title="Second Guest"
                     value={`${extra - invalidPersonName} + (${invalidPersonName})`}
                     loading={isLoading}/>
        </Col>

        <Col span={10}>
          <Statistic title="Total"
                     value={`${data?.guests?.length + extra - invalidPersonName} + (${invalidPersonName})`}
                     loading={isLoading}/>
        </Col>
      </Row>

      <Dropdown.Button placement="bottom"
                       style={{width: 'auto'}}
                       arrow={{pointAtCenter: true}}
                       menu={isAdmin ? {items: items.concat(infoOption)} : {items}}
      >Actions</Dropdown.Button>
    </Flex>;
  };

  const rowAction = (value: Guest) => {
    const deleteGuest = async () => {
      await axios.delete('/api/guest?id=' + value?.id);
      const guestList = data.guests?.filter((guest: any) => guest.id !== value.id);
      await mutate({...data, guests: guestList});
    };


    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (<Space>
          <EditOutlined/>
          <Link href={`../../${id}/invitation/${value?.id}`}>Go to Edit Page</Link>
        </Space>)
      },
      {
        key: '2',
        label: (<Space>
          <CloseCircleOutlined/>
          <Link href={`../../${id}/cancel/${value?.id}`}>Go to Cancel Page</Link>
        </Space>)
      },
      {
        type: 'divider',
      },
      {
        key: '4',
        label: (<Space>
          <MailOutlined/>
          <span onClick={() => resendEmail(value?.id)}>Resend invitation email</span>
        </ Space>)
      },
      {
        key: '3',
        danger: true,
        label: (<Space>
          <DeleteOutlined/>
          <span onClick={deleteGuest}>Delete Guest</span>
        </ Space>)
      },

    ];

    return <Dropdown.Button style={{width: 'auto'}}
                            arrow={{pointAtCenter: true}}
                            menu={{items}}>Actions
    </Dropdown.Button>;
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

  const isCelebrantEmail = (email: string): boolean => {
    return email === data?.email;
  }

  const email = (email: string) => {
    if (isCelebrantEmail(email)) {
      return <Badge.Ribbon color="green"
                           text="Celebrant"
                           style={{marginTop: '-25px'}}>
        <div style={{marginTop: '5px'}}>{email} </div>
      </Badge.Ribbon>
    }
    return isDuplicate!.includes(email) ? <mark>{email}</mark> : <span>{email}</span>;
  };

  const guests = data?.guests
    ?.sort((guest: Guest) => data.name?.toLowerCase()?.includes(guest?.name) && isCelebrantEmail(guest.email) ? -1 : 0)
    ?.sort((guest: Guest) => invalidExtraPersonName(guest?.extraPerson1) ? -1 : 0)
    ?.sort((guest: Guest) => isDuplicate!.includes(guest.email) ? 0 : 1);

  return <>
    <Table dataSource={guests}
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
                      const isInvalid = invalidExtraPersonName(value);

                      return isInvalid
                        ? <Badge.Ribbon color="volcano"
                                        text="Invalid"
                                        style={{marginTop: '-25px'}}>
                          <div style={{marginTop: '5px'}}>{value} </div>
                        </Badge.Ribbon>
                        : value;
                    }}/>
      {isAdmin && <Table.Column title="Email"
                                key="email"
                                render={email}
                                dataIndex="email"/>}
      <Table.Column title="Status"
                    key="status"
                    align={'center'}
                    render={(value: string) => {
                      const arr = ['NEW', 'EDITED', 'REJECTED'];
                      const colors = ['blue', 'purple', 'volcano'];

                      return <Tag color={colors[arr.indexOf(value)]}>{value}</Tag>;
                    }}
                    dataIndex="status"/>
      {isAdmin && <Table.Column dataIndex=""
                                key="action"
                                render={rowAction}/>}
    </Table>
    {contextHolder}
  </>;
}
