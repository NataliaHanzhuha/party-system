'use client';

import { Session } from 'next-auth';
import { useState } from 'react';

interface Props {
  session: Session | null;
}

export default function AuthForm({ session }: any) {
  const [email, setEmail] = useState('');

  const handleEmailSignIn = () => {
    // handle email sign in
  };

  const handleSignOut = () => {
    // hande sign out
  };

  return (
    <div>
      {!session && (
        <>
          <form onSubmit={handleEmailSignIn}>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button>Continue</button>
          </form>
        </>
      )}

      {session && <button onClick={handleSignOut}>Sign out</button>}
    </div>
  );
}
