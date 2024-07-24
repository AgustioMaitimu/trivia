'use client';

import React, { useState } from 'react';

function Login({ setIsLogin, doodle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-[#F3BC72] p-8 shadow-lg">
      <h1 className={`${doodle.className} mb-4 text-3xl text-[#30281C]`}>
        Login
      </h1>
      <p className="mb-4 text-[#30281C]">I&apos;m Ready!</p>
      <input
        className="mb-4 w-full rounded border border-[#30281C] p-2"
        placeholder="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-4 w-full rounded border border-[#30281C] p-2"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full rounded bg-[#30281C] p-2 text-white hover:bg-[#2a241a]"
        onClick={handleSubmit}
      >
        Log In
      </button>
      <div className="mt-5 flex w-full flex-col gap-6 text-[#30281C]">
        <p
          className="cursor-pointer self-center hover:underline"
          onClick={() => setIsLogin(false)}
        >
          Forgot Password?
        </p>
        <p
          className="cursor-pointer self-end underline"
          onClick={() => setIsLogin(false)}
        >
          Create Account
        </p>
      </div>
    </div>
  );
}

export default Login;
