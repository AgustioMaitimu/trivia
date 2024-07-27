/* eslint-disable react-hooks/exhaustive-deps */
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
    <div className="max-w-screen">
      <h1>{time}</h1>
      {categoryData && (
        <div>
          <h1>
            {decodeHtmlEntities(
              JSON.stringify(
                categoryData.questions[15 - categoryData.questionsLeft]
                  .question,
              ),
            )}
          </h1>
          <div className="flex gap-4">
            <button onClick={(e) => handleAnswer(e)}>True</button>
            <button onClick={(e) => handleAnswer(e)}>False</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage;
