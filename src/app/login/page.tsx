// import { auth } from '../api/auth/[...nextauth]/auth';
// import AuthForm from '@/components/loginForm';

export default async function Page() {
  // const session = await auth();

  return (
    <main className="flex flex-col gap-3">
      <h1>My Custom Auth Page</h1>
      {/*<AuthForm session={session} />*/}
    </main>
  );
}
