'use client';
import React, { useEffect } from 'react';

function Redirect() {
  useEffect(() => {
    setTimeout(function () {
      window.location = '/';
    }, 3000);
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center px-6 text-center">
      You are not logged in, redirecting in 3 seconds...
    </div>
  );
}

export default Redirect;
