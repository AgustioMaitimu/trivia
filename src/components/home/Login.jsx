/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/legacy/image';

function Login() {
  const { data, status } = useSession();
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    if (status === 'authenticated' && data?.user?.name) {
      setUserName(data.user.name);
      setProfilePic(data.user.image);
    }
  }, [status, data]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-transparent font-semibold">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center gap-4">
          <button
            onClick={() => signIn('github', { callbackUrl: '/quiz' })}
            className="flex w-full max-w-xs items-center justify-evenly gap-2 rounded-lg border border-[#0D1117] bg-[#0D1117] px-4 py-3 font-medium text-white transition duration-300 hover:bg-[#2d2d2d]"
          >
            Continue with GitHub{' '}
            <div className="relative aspect-[2443/2500] w-9">
              <Image
                alt="github"
                layout="fill"
                className="object-cover"
                src="/github.svg"
              />
            </div>
          </button>
          <button
            onClick={() => signIn('google', { callbackUrl: '/quiz' })}
            className="flex w-full max-w-xs items-center justify-evenly gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-[#4081EC] transition duration-300 hover:bg-gray-100 hover:text-[#1a73e8]"
          >
            Continue with Google
            <div className="relative aspect-[2443/2500] w-9">
              <Image
                alt="google"
                layout="fill"
                className="object-cover"
                src="/google.svg"
              />
            </div>
          </button>
          {userName && (
            <>
              <div className="my-4 h-[1px] w-full max-w-xs rounded-full bg-black"></div>

              <Link
                href="/quiz"
                className="flex w-full max-w-xs items-center justify-evenly gap-2 rounded-lg border border-[#007BFF] bg-[#e7f0ff] px-4 py-3 font-medium text-[#007BFF] transition duration-300 hover:bg-[#c5d8ff] hover:text-[#0056b3]"
              >
                Log In as {userName}
                <img
                  src={profilePic}
                  alt="profile-pic"
                  className="h-9 w-auto rounded-full"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
