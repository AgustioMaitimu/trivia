'use client';

import React, { useEffect, useState } from 'react';
import Timer from 'easytimer.js';
import { useSearchParams } from 'next/navigation';
import GameCard from '@/components/game/GameCard';

function GamePage() {
  const [allData, setAllData] = useState(
    JSON.parse(localStorage.getItem('tios-trivia')) || {},
  );
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [categoryData, setCategoryData] = useState(
    allData[formatCategory(categoryParam)] || {},
  );
  const [timer, setTimer] = useState(new Timer());
  const [time, setTime] = useState(90);
  const [timerPaused, setTimerPaused] = useState(false);
  const [isQuizEnded, setIsQuizEnded] = useState(false);

  useEffect(() => {
    timer.start({
      countdown: true,
      startValues: { seconds: categoryData?.timer || 90 }, // Set timer from categoryData or default to 90
    });

    const updateTimer = () => {
      setTime(timer.getTotalTimeValues().seconds);
    };

    timer.addEventListener('secondsUpdated', updateTimer);

    timer.addEventListener('targetAchieved', () => {
      if (!isQuizEnded) {
        alertQuizStats();
        setIsQuizEnded(true);
      }
    });

    const handleBeforeUnload = (e) => {
      if (!isQuizEnded) {
        e.preventDefault();
        e.returnValue = '';
        saveGameData();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      timer.stop();
      timer.removeEventListener('secondsUpdated', updateTimer);
      timer.removeEventListener('targetAchieved');
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [timer, isQuizEnded]);

  useEffect(() => {
    setAllData((prevData) => ({
      ...prevData,
      [formatCategory(categoryParam)]: {
        ...categoryData,
        timer: time, // Add current timer value to allData
      },
    }));
    saveGameData();
  }, [categoryData, time]);

  function formatCategory(category) {
    return category
      .replace(/\+/g, ' ')
      .toLowerCase()
      .replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
  }

  function handlePause() {
    if (timerPaused) {
      setTimerPaused(false);
      timer.start();
    } else {
      setTimerPaused(true);
      timer.pause();
    }
  }

  function saveGameData() {
    localStorage.setItem('tios-trivia', JSON.stringify(allData));
  }

  function alertQuizStats() {
    const { questionsLeft, correctAnswers, incorrectAnswers } = categoryData;
    alert(
      `Quiz Over!\nQuestions Left: ${questionsLeft}\nCorrect Answers: ${correctAnswers}\nIncorrect Answers: ${incorrectAnswers}`,
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 cursor-pointer text-3xl" onClick={handlePause}>
        {time}
      </div>
      {categoryData && !isQuizEnded && (
        <GameCard
          categoryData={categoryData}
          onEnd={() => {
            alertQuizStats();
            setIsQuizEnded(true);
          }}
        />
      )}
    </div>
  );
}

export default GamePage;
