import Login from '@/src/components/login';

export default function Page() {
  return <Login redirectPath={'/clients'} provider={'admin'}/>
}
