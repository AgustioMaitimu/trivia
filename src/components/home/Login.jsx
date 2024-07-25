'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-transparent p-12">
      <div className="flex w-full max-w-xs flex-col items-center gap-4 rounded-lg border border-gray-300 bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => signIn('github')}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#333] px-4 py-2 text-white hover:bg-[#444]"
          >
            Sign In with GitHub
          </button>
          <button
            onClick={() => signIn('google')}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#4285F4] px-4 py-2 text-white hover:bg-[#357ae8]"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
