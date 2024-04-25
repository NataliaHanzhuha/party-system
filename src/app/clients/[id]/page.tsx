'use client';
import { Button, Table, Typography } from 'antd';
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

  return <>
    <Title level={2}
           style={{marginBottom: 0}}>
      Client: {data ? data?.name : params.id}
    </Title>
    Guests: {data?.guests?.length ?? 0}

    <Table dataSource={data?.guests}>
      <Table.Column title="Name"
                    key="name"
                    dataIndex="name"/>
      <Table.Column title="Status"
                    key="status"
                    dataIndex="status"/>
      <Table.Column title="Email"
                    key="email"
                    dataIndex="email"/>
      <Table.Column title={() => <>
                      Action
                      <Link href={`../../${data?.id}/invitation`}>Add guest link</Link>
                    </>}
                    dataIndex=""
                    key="x"
                    render={(value: Guest) => <>
                      <Link href={`../../${data?.id}/invitation/${value?.id}`}>Edit</Link>
                      <Link href={`../../${data?.id}/cancel/${value?.id}`}>Cancel</Link>

                    </>}/>
    </Table>
  </>;
}
