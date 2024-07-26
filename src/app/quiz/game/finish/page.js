'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

function FinishedPage() {
  const router = useRouter();
  const query = new URLSearchParams(window.location.search);
  const questionsLeft = query.get('questionsLeft');
  const correctAnswers = query.get('correctAnswers');
  const incorrectAnswers = query.get('incorrectAnswers');

  const handleGoBack = () => {
    router.push('/quiz');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-4xl font-bold">Quiz Finished!</h1>
      <div className="mb-4 text-xl">
        <p>Questions Left: {questionsLeft}</p>
        <p>Correct Answers: {correctAnswers}</p>
        <p>Incorrect Answers: {incorrectAnswers}</p>
      </div>
      <button
        onClick={handleGoBack}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Go Back to Home
      </button>
    </div>
  );
}

export default FinishedPage;
