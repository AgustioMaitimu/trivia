'use client';

import React, { useState } from 'react';
import { Caveat_Brush } from 'next/font/google';
import CreateAccount from './Create';
import Login from './Login';

const doodle = Caveat_Brush({ subsets: ['latin'], weight: '400' });

function AccountContainer() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="z-10 flex h-screen w-screen flex-col items-center justify-center gap-10 bg-transparent px-6 md:px-0">
      {isLogin ? (
        <Login setIsLogin={setIsLogin} doodle={doodle} />
      ) : (
        <CreateAccount setIsLogin={setIsLogin} doodle={doodle} />
      )}
    </div>
  );
}

export default AccountContainer;
