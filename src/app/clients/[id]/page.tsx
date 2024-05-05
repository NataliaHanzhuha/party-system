'use client';
import type { MenuProps } from 'antd';
import { Divider, Dropdown, Flex, Space, Table, Tag, Typography } from 'antd';
import axios from 'axios';
import useSWR from 'swr';
import Link from 'next/link';
import { Guest } from '@prisma/client';
import { FileExcelOutlined, IdcardOutlined, UnorderedListOutlined, UserAddOutlined } from '@ant-design/icons';

interface PostsEditProps {
  params: {
    id: string;
  };
}

const {Title} = Typography;

export default function ClientData({params}: PostsEditProps) {
  const {id} = params;
  const fetcher = (url: string) => axios.get(url).then(res => res.data);
  const {data, error, isLoading} = useSWR('/api/client?id=' + id, fetcher);

  if (!isLoading && !data?.id) {
    return 'no client yet';
  }

  const getEmailWIthGuests = async () => {
    await axios.get('/api/client/list?id=' + id);
  };

  const items: MenuProps['items'] = [
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
    {
      type: 'divider',
    },
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
    }
  ];

  const header = () => {
    return <Flex gap="middle"
                 vertical={false}
                 style={{width: '100%'}}
                 align={'center'}
                 justify={'space-between'}>
      <Title level={2}
             style={{margin: 0, flex: 1}}>
        Client: {!isLoading && <>{data ? data?.name : id}</>}
      </Title>

      <div>Guests: {data?.guests?.length ?? 0}</div>
      <Dropdown.Button placement="bottom"
                       style={{width: 'auto'}}
                       arrow={{pointAtCenter: true}}
                       menu={{items}}>Actions</Dropdown.Button>
    </Flex>;
  };

  return <>
    <Table dataSource={data?.guests}
           size="small"
           bordered={true}
           loading={isLoading}
           scroll={{y: 500}}
           pagination={{position: ['bottomRight']}}
           title={header}
           rowKey="id"
           virtual>
      <Table.Column title="Name"
                    key="name"
                    dataIndex="name"/>
      <Table.Column title="Extra Guest"
                    key="extraPerson1"
                    dataIndex="extraPerson1"/>
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
