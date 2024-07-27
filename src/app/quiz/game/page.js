/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Timer from 'easytimer.js';
import React, { useEffect, useState } from 'react';

const categoryMap = {
  'general knowledge':
    'https://opentdb.com/api.php?amount=15&category=9&type=boolean',
  geography: 'https://opentdb.com/api.php?amount=15&category=22&type=boolean',
  history: 'https://opentdb.com/api.php?amount=15&category=23&type=boolean',
};

const decodeHtmlEntities = (text) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  let decodedText = textarea.value;
  return decodedText.replace(/^"|"$/g, '');
};

const GamePage = () => {
  const [timer] = useState(new Timer());
  const [categoryName, setCategoryName] = useState();
  const [allData, setAllData] = useState({});
  const [categoryData, setCategoryData] = useState();
  const [time, setTime] = useState();
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const category = searchParams.get('category');

    setCategoryName(
      category ? capitalizeFirstLetter(category.replace('+', ' ')) : 'Unknown',
    );
    setAllData(JSON.parse(localStorage.getItem('tios-trivia')) || {});
  }, []);

  useEffect(() => {
    if (!allData || !categoryName) return;

    const fetchCategoryData = async () => {
      const link = categoryMap[categoryName.toLowerCase()];
      if (link) {
        const response = await fetch(link);
        const data = await response.json();
        setCategoryData({
          questions: data.results,
          questionsLeft: 15,
          correctAnswers: 0,
          incorrectAnswers: 0,
          timer: 90,
        });
      }
    };

    if (allData[categoryName]) {
      setCategoryData(allData[categoryName]);
    } else {
      fetchCategoryData();
    }
  }, [allData, categoryName]);

  useEffect(() => {
    if (!categoryData) return;

    setTime(categoryData.timer);

    timer.start({
      countdown: true,
      startValues: { seconds: categoryData.timer },
    });

    const updateTimer = () => setTime(timer.getTotalTimeValues().seconds);
    const handleTimerEnd = () => setGameEnded(true);

    timer.addEventListener('secondsUpdated', updateTimer);
    timer.addEventListener('targetAchieved', handleTimerEnd);

    return () => {
      timer.removeEventListener('secondsUpdated', updateTimer);
      timer.removeEventListener('targetAchieved', handleTimerEnd);
    };
  }, [categoryData, timer]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!gameEnded) {
        saveData();
      }
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [categoryData, allData, time, gameEnded]);

  useEffect(() => {
    if (gameEnded) {
      removeCategoryData();
      setTimeout(() => {
        window.location.href = '/quiz';
      }, 300);
    }
  }, [gameEnded]);

  function handleAnswer() {
    const currentQuestion =
      categoryData.questions[15 - categoryData.questionsLeft];
    if (e.target.innerHTML === currentQuestion.correct_answer) {
      categoryData.correctAnswers++;
    } else {
      categoryData.incorrectAnswers++;
    }
    categoryData.questionsLeft--;
  }

  function saveData() {
    if (categoryData) {
      categoryData.timer = time;
      const updatedAllData = { ...allData, [categoryName]: categoryData };
      localStorage.setItem('tios-trivia', JSON.stringify(updatedAllData));
    }
  }

  function removeCategoryData() {
    if (allData && categoryName) {
      const updatedAllData = Object.keys(allData)
        .filter((key) => key !== categoryName)
        .reduce((obj, key) => {
          obj[key] = allData[key];
          return obj;
        }, {});
      localStorage.setItem('tios-trivia', JSON.stringify(updatedAllData));
    }
  }

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  if (!categoryData) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#E9E5DC] p-6">
      {categoryData.questionsLeft === 0 || time === 0 ? (
        <div className="w-full max-w-md rounded-lg bg-[#F2BC71] p-6 text-[#000000] shadow-lg">
          <h2 className="text-center text-lg font-medium">Results</h2>
          <p className="text-center">
            Answered: {15 - categoryData.questionsLeft} / 15
          </p>
          <p className="text-center">
            Correct Answers: {categoryData.correctAnswers}
          </p>
          <p className="text-center">
            Incorrect Answers: {categoryData.incorrectAnswers}
          </p>
          <button
            className="mt-4 rounded-lg bg-[#E9E5DC] px-4 py-2 text-[#000000] shadow-md transition duration-300 hover:bg-[#d1c5b5]"
            onClick={() => setGameEnded(true)}
          >
            Back to Home
          </button>
        </div>
      ) : (
        categoryData.questionsLeft > 0 && (
          <>
            <div className="mb-6 flex gap-6">
              <h1
                onClick={() => timer.pause()}
                className="text-3xl font-bold text-[#000000]"
              >
                {time}s
              </h1>
              <h1 className="text-xl text-[#000000]">
                {15 - categoryData.questionsLeft + 1} / 15
              </h1>
            </div>
            <div className="w-full max-w-lg rounded-lg bg-[#F2BC71] p-6 text-[#000000] shadow-lg">
              <h2 className="mb-4 text-center text-lg font-medium">
                {decodeHtmlEntities(
                  categoryData.questions[15 - categoryData.questionsLeft]
                    .question,
                )}
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  className="rounded-lg bg-[#E9E5DC] px-4 py-2 text-[#000000] shadow-md transition duration-300 hover:bg-[#d1c5b5]"
                  onClick={handleAnswer}
                >
                  True
                </button>
                <button
                  className="rounded-lg bg-[#E9E5DC] px-4 py-2 text-[#000000] shadow-md transition duration-300 hover:bg-[#d1c5b5]"
                  onClick={handleAnswer}
                >
                  False
                </button>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default GamePage;
