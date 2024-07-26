'use client';

import React, { useState } from 'react';

function decodeHtmlEntity(text) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

function GameCard({ categoryData, onEnd }) {
  const { questions, questionsLeft } = categoryData;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    questions.length - questionsLeft,
  );

  if (questions.length === 0) return null; // No questions to display

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    const isCorrect = answer === currentQuestion.correct_answer;
    if (isCorrect) {
      categoryData.correctAnswers += 1;
    } else {
      categoryData.incorrectAnswers += 1;
    }

    categoryData.questionsLeft -= 1;

    if (categoryData.questionsLeft > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      onEnd(); // Notify that the quiz has ended
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="mb-2 text-xl font-semibold">
        Question {questions.length - questionsLeft + 1} of {questions.length}
      </h2>
      <p className="mb-4 text-lg">
        {decodeHtmlEntity(currentQuestion.question)}
      </p>
      <div className="flex gap-4">
        <button
          className="rounded bg-green-500 px-4 py-2 text-white"
          onClick={() => handleAnswer('True')}
        >
          True
        </button>
        <button
          className="rounded bg-red-500 px-4 py-2 text-white"
          onClick={() => handleAnswer('False')}
        >
          False
        </button>
      </div>
    </div>
  );
}

export default GameCard;
