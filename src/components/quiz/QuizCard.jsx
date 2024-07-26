'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function QuizCard({ subject, seconds, questions, link }) {
  const [buttonText, setButtonText] = useState('Attempt Trivia');
  const router = useRouter();

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

  async function handleClick() {
    if (buttonText === 'Attempt Trivia') {
      const response = await fetch(link);
      const data = await response.json();

      const categoryData = {
        questions: data.results,
        questionsLeft: data.results.length,
        correctAnswers: 0,
        incorrectAnswers: 0,
      };

      const triviaData = localStorage.getItem('tios-trivia');
      const trivia = triviaData ? JSON.parse(triviaData) : {};

      trivia[subject] = categoryData;

      localStorage.setItem('tios-trivia', JSON.stringify(trivia));
    }

    router.push(
      `/quiz/game?category=${encodeURIComponent(subject.toLowerCase())}`,
    );
  }

  return (
    <div className="flex h-48 w-full flex-col justify-between rounded-2xl bg-[#F2BC71] p-6 md:w-[31%] xl:w-[28%]">
      <h1 className="text-2xl font-semibold">{subject}</h1>
      <div className="-mt-2 flex flex-col gap-1 text-sm">
        <p>• {seconds} Seconds</p>
        <p>• {questions} Questions</p>
      </div>
      <button
        className="rounded-lg bg-black py-3 text-white"
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default QuizCard;
