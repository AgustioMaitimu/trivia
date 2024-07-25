/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Caveat_Brush } from 'next/font/google';
import Link from 'next/link';
import { Lato } from 'next/font/google';

const lato = Lato({ subsets: ['latin'], weight: '400' });
const doodle = Caveat_Brush({ subsets: ['latin'], weight: '400' });

function QuizHeader() {
  const { data } = useSession();
  const name = data.user.name;
  const image = data.user.image;

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div
      className={`${lato.className} flex h-fit w-full items-center justify-between bg-transparent px-3 py-8`}
    >
      <div
        className={`${doodle.className} flex items-end gap-1 text-2xl text-[#30281C] md:text-3xl`}
      >
        <Link href="/">Tio&apos;s Trivia</Link>
        <div className="mb-2 h-2 w-2 rounded-full bg-[#F3BC72] md:h-3 md:w-3"></div>
      </div>
      <div className="flex w-fit flex-col items-center md:flex-row">
        <h1 className="mr-4 hidden md:inline">{name}</h1>
        <div
          className="relative flex items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={image}
            alt="Profile Picture"
            className="mr-3 aspect-square w-14 rounded-full border-2 border-dashed border-black p-1"
          />
          {dropdownVisible && (
            <div className="absolute right-0 top-[47px] mt-2 w-40 rounded-md border border-gray-300 bg-white shadow-lg">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizHeader;
