import React from 'react';
import QuizHeader from './QuizHeader'; // Adjust the import path as needed
import QuizBanner from './QuizBanner';

function QuizMain() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F7F5F3]">
      <div className="flex h-full w-full max-w-[1280px] flex-col px-4">
        <QuizHeader />
        <QuizBanner />
      </div>
    </div>
  );
}

export default QuizMain;
