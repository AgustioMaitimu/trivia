import React, { useEffect, useRef } from 'react';

function Redirect() {
  const warningRef = useRef(null);

  useEffect(() => {
    let timer = setTimeout(function () {
      window.location = '/';
    }, 3000);

    if (warningRef) {
      timer;
    }
  }, [warningRef]);

  return (
    <div
      ref={warningRef}
      className="flex h-screen w-screen items-center justify-center bg-[#FCFBFA] px-5 text-center"
    >
      You are not logged in, Redirecting in 3 seconds...
    </div>
  );
}

export default Redirect;
