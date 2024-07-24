'use client';

import React, { useEffect, useState } from 'react';
import { Caveat_Brush } from 'next/font/google';
import Image from 'next/image';

const doodle = Caveat_Brush({ subsets: ['latin'], weight: '400' });

function Background() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setScrollPosition(window.scrollY);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 flex h-screen w-screen flex-col items-center justify-center gap-8 md:gap-12"
      style={{
        transform: `translateX(${scrollPosition * 2}px`,
      }}
    >
      <div className="relative -mt-6 aspect-[4/3] w-[45vw] md:-mt-9 md:w-[39vw] lg:w-72">
        <Image
          alt="float"
          src="/float.png"
          layout="fill"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-8 md:gap-12">
        <div className={`${doodle.className} mb-2 flex flex-col items-center`}>
          <h1 className="z-20 text-6xl text-[#30281C] md:text-7xl">
            Tio&apos;s Trivia
          </h1>
          <div className="-mt-6 mr-6 h-6 w-full bg-[#F3BC72] md:-mt-8 md:h-10"></div>
        </div>
        <p className="w-full px-8 text-center text-sm text-[#30281C] md:px-20 md:text-lg lg:w-[1024px]">
          Challenge Yourself with a Variety of Fun and Exciting Questions Across
          Multiple Categories. Sharpen Your Mind and Enjoy the Thrill of
          Tio&apos;s Trivia!
        </p>
      </div>
    </div>
  );
}

export default Background;
