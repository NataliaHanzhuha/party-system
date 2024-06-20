'use client'; // Error components must be Client Components

import { Result } from 'antd';
interface IError {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage() {
  return  <Result
    status="warning"
    title="There are some problems with your operation. Here is no celebrant with this account"
  />
}
