'use client'

export default function DefaultInvitation({data}: any) {
  console.log(data);

  return <>
    <h1>Default</h1>
    {data?.name ?? '-'} {data?.client?.name ?? '-'}
  </>
}
