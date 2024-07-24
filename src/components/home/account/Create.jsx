'use client';

import React, { useState } from 'react';

function CreateAccount({ setIsLogin, doodle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-[#F3BC72] p-8 shadow-lg">
      <h1 className={`${doodle.className} mb-4 text-3xl text-[#30281C]`}>
        Create Account
      </h1>
      <p className="mb-4 text-[#30281C]">Let me in!</p>
      <input
        className="mb-4 w-full rounded border border-[#30281C] p-2"
        placeholder="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-4 w-full rounded border border-[#30281C] p-2"
        placeholder="Create Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="mb-4 w-full rounded border border-[#30281C] p-2"
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        className="w-full rounded bg-[#30281C] p-2 text-white hover:bg-[#2a241a]"
        onClick={handleSubmit}
      >
        Create Account
      </button>
      <div className="mt-5 flex w-full flex-col gap-6 text-[#30281C]">
        <p
          className="cursor-pointer self-center underline hover:underline"
          onClick={() => setIsLogin(true)}
        >
          Already have an account? Log In
        </p>
      </div>
    </div>
  );
}

export default CreateAccount;
