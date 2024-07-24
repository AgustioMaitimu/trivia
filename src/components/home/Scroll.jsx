'use client';

import Image from 'next/legacy/image';
import React, { useEffect, useState } from 'react';

function Scroll() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    window.onscroll = function (ev) {
      var docHeight = document.body.offsetHeight;
      docHeight =
        docHeight == undefined
          ? window.document.documentElement.scrollHeight
          : docHeight;

      var winheight = window.innerHeight;
      winheight =
        winheight == undefined
          ? document.documentElement.clientHeight
          : winheight;

      var scrollpoint = window.scrollY;
      scrollpoint =
        scrollpoint == undefined
          ? window.document.documentElement.scrollTop
          : scrollpoint;

      if (scrollpoint + winheight >= docHeight) {
        setHidden(true);
      }
    };
  }, []);

  return (
    <div
      className={`${hidden && 'hidden'} fixed bottom-4 right-4 z-0 aspect-square w-20 md:w-32`}
    >
      <Image
        alt="loading"
        src="/scroll.gif"
        className="object-cover"
        layout="fill"
      />
    </div>
  );
}

export default Scroll;
