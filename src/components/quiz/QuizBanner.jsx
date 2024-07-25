/* eslint-disable @next/next/no-img-element */
import Image from 'next/legacy/image';
import React from 'react';

function QuizBanner() {
  return (
    <div className="flex w-full flex-col gap-14 rounded-3xl bg-[#E9E5DC] p-6 text-[#30281C] md:flex-row md:justify-between md:gap-0 lg:px-14">
      <div className="flex flex-col gap-10 md:w-[40%] lg:justify-evenly lg:gap-0">
        <div>
          <h1 className="text-4xl font-medium lg:text-5xl">
            Choose Your <span className="challenge font-bold">Challenge</span>
          </h1>
          <p className="mt-6 lg:mt-10 lg:text-lg">
            Test your knowledge with our challenging quiz. Are you up for the
            challenge?
          </p>
        </div>
        <button className="hidden w-full items-center justify-between rounded-full bg-black px-6 py-2 font-medium text-white md:flex lg:w-64">
          Start Quiz <img src="/arrow.svg" alt="" className="h-auto w-10" />
        </button>
      </div>
      <div className="flex flex-col gap-6 md:w-[50%]">
        <div className="relative aspect-[4/3] w-full">
          <Image
            priority
            alt="reading"
            src="/reading.png"
            layout="fill"
            className="object-cover"
          />
        </div>
        <button className="flex w-full items-center justify-between rounded-full bg-black px-7 py-2 font-medium text-white md:hidden">
          Start Quiz <img src="/arrow.svg" alt="" className="h-auto w-10" />
        </button>
      </div>
    </div>
  );
}

export default QuizBanner;
