'use client';
import { Divider, Table, Typography, Tag } from 'antd';
import axios from 'axios';
import useSWR from 'swr';
import Link from 'next/link';
import { Guest } from '@prisma/client';

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

  if (isLoading) {
    return 'loading...';
  }

  if (!data?.id) {
    return 'no client yet';
  }

  const getEmailWIthGuests = async () => {
    await axios.get('/api/client/list?id=' + id);
  };

  return <>
    <Title level={2}
           style={{marginBottom: 0}}>
      Client: {data ? data?.name : params.id}
    </Title>
    Guests: {data?.guests?.length ?? 0}
    <Divider type="vertical" />
    <Link href={`../../${data?.id}/wishes`}> Add Wish link</Link>
    <Divider type="vertical" />
    <Link href={`../../${data?.id}/wishes/list`}>Wish list link</Link>

    <button onClick={getEmailWIthGuests}>get list of guests</button>
    <Table dataSource={data?.guests}>
      <Table.Column title="Name"
                    key="name"
                    dataIndex="name"/>
      <Table.Column title="Email"
                    key="email"
                    dataIndex="email"/>
      <Table.Column title="Status"
                    key="status"
                    render={(value: string) => {
                      const arr = ['NEW', 'EDITED', 'REJECTED'];
                      const colors = ['blue', 'purple', 'volcano'];

                      return <Tag color={colors[arr.indexOf(value)]}>{value}</Tag>
                    }}
                    dataIndex="status"/>
      <Table.Column title={() => <Link href={`../../${data?.id}/invitation`}>Add guest link</Link>}
                    dataIndex=""
                    key="action"
                    render={(value: Guest) => <>
                      <Link href={`../../${data?.id}/invitation/${value?.id}`}>Edit</Link>
                      <Divider type="vertical" />
                      <Link href={`../../${data?.id}/cancel/${value?.id}`}>Cancel</Link>

                    </>}/>
    </Table>
  </>;
}
