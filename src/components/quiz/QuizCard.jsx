'use client';

import React, { useState, useEffect } from 'react';

function QuizCard({ subject, seconds, questions, link }) {
  const [buttonText, setButtonText] = useState('Attempt Trivia');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const triviaData = localStorage.getItem('tios-trivia');

    if (triviaData) {
      const trivia = JSON.parse(triviaData);
      if (trivia[subject]) {
        setButtonText('Continue Trivia');
      } else {
        setButtonText('Attempt Trivia');
      }
    }
  }, [subject]);

  useEffect(() => {
    if (redirect) {
      window.location.href = `/quiz/game?category=${encodeURIComponent(subject.toLowerCase())}`;
    }
  }, [redirect, subject]);

  return (
    <div className="flex h-48 w-full flex-col justify-between rounded-2xl bg-[#F2BC71] p-6 md:w-[31%] xl:w-[28%]">
      <h1 className="text-2xl font-semibold">{subject}</h1>
      <div className="-mt-2 flex flex-col gap-1 text-sm">
        <p>• {seconds} Seconds</p>
        <p>• {questions} Questions</p>
      </div>
      <button
        className="rounded-lg bg-black py-3 text-white"
        onClick={() => setRedirect(true)}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default QuizCard;
