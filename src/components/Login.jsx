'use client';

import React from 'react';
import { Caveat_Brush } from 'next/font/google';

const doodle = Caveat_Brush({ subsets: ['latin'], weight: '400' });

function LoginCard() {
  return (
    <div className="z-10 flex h-screen w-screen items-center justify-center bg-transparent  px-6 md:px-0">
      <div className="flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-[#F3BC72] p-8 shadow-lg">
        <h1 className={`${doodle.className} mb-4 text-3xl text-[#30281C]`}>
          Login
        </h1>
        <p className="mb-4 text-[#30281C]">I&apos;m Ready!</p>
        <input
          className="mb-4 w-full rounded border border-[#30281C] p-2"
          placeholder="Email address"
          type="email"
        />
        <input
          className="mb-4 w-full rounded border border-[#30281C] p-2"
          placeholder="Password"
          type="password"
        />
        <div className="mb-4 flex items-center">
          <input type="checkbox" className="mr-2" />
          <p className="text-[#30281C]">Keep me logged in</p>
        </div>
        <button className="w-full rounded bg-[#30281C] p-2 text-white hover:bg-[#2a241a]">
          Log In
        </button>
        <div className="mt-5 flex w-full flex-col gap-6 text-[#30281C]">
          <p className="cursor-pointer self-center hover:underline">
            Forgot Password?
          </p>
          <p className="cursor-pointer self-end underline">Create Account</p>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
