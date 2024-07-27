'use client';

import Timer from 'easytimer.js';
import React, { useEffect, useState } from 'react';

function GamePage(props) {
  const [timer] = useState(new Timer()); // Use state to hold Timer instance
  const [categoryName, setCategoryName] = useState();
  const [allData, setAllData] = useState();
  const [categoryData, setCategoryData] = useState();
  const [time, setTime] = useState(); // State to store timer value

  function getFetchLink(category) {
    const categoryMap = {
      'general knowledge':
        'https://opentdb.com/api.php?amount=15&category=9&type=boolean',
      geography:
        'https://opentdb.com/api.php?amount=15&category=22&type=boolean',
      history: 'https://opentdb.com/api.php?amount=15&category=23&type=boolean',
    };

    return categoryMap[category] || 'Unknown Category';
  }

  function decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;

    let decodedText = textarea.value;

    decodedText = decodedText.replace(/^"|"$/g, '');

    return decodedText;
  }

  function handleAnswer(e) {
    if (
      e.target.innerHTML ==
      categoryData.questions[15 - categoryData.questionsLeft].correct_answer
    ) {
      categoryData.correctAnswers++;
    } else {
      categoryData.incorrectAnswers++;
    }
    categoryData.questionsLeft--;
    if (categoryData.questionsLeft == 0) {
      alert('done');
    }
    console.log(
      categoryData.correctAnswers,
      categoryData.incorrectAnswers,
      categoryData.questionsLeft,
    );
  }

  function saveData() {
    console.log('reached here');
    categoryData.timer = time;
    const updatedAllData = { ...allData, [categoryName]: categoryData };
    localStorage.setItem('tios-trivia', JSON.stringify(updatedAllData));
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    function parseCategoryName() {
      switch (searchParams.get('category')) {
        case 'general knowledge':
          setCategoryName('General Knowledge');
          break;
        case 'geography':
          setCategoryName('Geography');
          break;
        case 'history':
          setCategoryName('History');
          break;
        default:
          setCategoryName('Unknown');
      }
    }

    parseCategoryName();
    setAllData(JSON.parse(localStorage.getItem('tios-trivia')) || {});
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    async function setNewData() {
      const link = getFetchLink(searchParams.get('category'));
      const response = await fetch(link);
      const responseJSON = await response.json();
      setCategoryData({
        questions: responseJSON.results,
        questionsLeft: 15,
        correctAnswers: 0,
        incorrectAnswers: 0,
        timer: 90,
      });
    }

    if (allData && categoryName) {
      if (allData[categoryName]) {
        setCategoryData(allData[categoryName]);
      } else {
        setNewData();
      }
    }
  }, [allData, categoryName]);

  useEffect(() => {
    if (categoryData) {
      setTime(categoryData.timer);

      timer.start({
        countdown: true,
        startValues: { seconds: categoryData.timer },
      });

      const updateTimer = () => {
        setTime(timer.getTotalTimeValues().seconds);
      };

      timer.addEventListener('secondsUpdated', updateTimer);
    }
  }, [categoryData, timer]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      saveData();
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [categoryData, allData, time]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#E9E5DC] p-6">
      {categoryData && (
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
          <div className="w-full max-w-md rounded-lg bg-[#F2BC71] p-6 text-[#000000] shadow-lg">
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
      )}
    </div>
  );
}

export default GamePage;
