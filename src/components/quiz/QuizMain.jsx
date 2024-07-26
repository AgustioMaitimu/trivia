import React from 'react';
import QuizHeader from './QuizHeader'; // Adjust the import path as needed
import QuizBanner from './QuizBanner';
import Quizzes from './Quizzes';
import { Lato } from 'next/font/google';

const lato = Lato({ subsets: ['latin'], weight: '400' });

function QuizMain() {
  return (
    <div className="flex min-h-screen w-screen justify-center bg-[#F7F5F3]">
      <div
        className={`${lato.className} flex h-full w-full max-w-[1280px] flex-col px-4`}
      >
        <QuizHeader />
        <QuizBanner />
        <Quizzes />
      </div>
    </div>
  );
}

export default QuizMain;
