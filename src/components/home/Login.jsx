'use client';

import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

function Login() {
  const { data, status } = useSession();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (status === 'authenticated' && data?.user?.name) {
      setUserName(data.user.name);
    }
  }, [status, data]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-transparent p-12">
      <div className="flex w-full max-w-xs flex-col items-center gap-4 rounded-lg border border-gray-300 bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => signIn('github', { callbackUrl: '/quiz' })}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#333] px-4 py-2 text-white hover:bg-[#444]"
          >
            Sign In with GitHub
          </button>
          <button
            onClick={() => signIn('google', { callbackUrl: '/quiz' })}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4285F4] px-4 py-2 text-white hover:bg-[#357ae8]"
          >
            Sign In with Google
          </button>
          {userName && (
            <Link
              href="/quiz"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4285F4] px-4 py-2 text-white hover:bg-[#357ae8]"
            >
              Log In as {userName}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
