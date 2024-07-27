import React from 'react';
import QuizCard from './QuizCard';
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from 'react-scroll';

function Quizzes() {
  return (
    <Element
      name="quiz-cards"
      className="mb-10 mt-14 flex flex-row flex-wrap justify-between gap-5"
    >
      <QuizCard
        subject="General Knowledge"
        seconds="90"
        questions="15"
        link="https://opentdb.com/api.php?amount=15&category=9&type=boolean"
      />
      <QuizCard
        subject="Geography"
        seconds="90"
        questions="15"
        link="https://opentdb.com/api.php?amount=15&category=22&type=boolean"
      />
      <QuizCard
        subject="History"
        seconds="90"
        questions="15"
        link="https://opentdb.com/api.php?amount=15&category=23&type=boolean"
      />
    </Element>
  );
}

export default Quizzes;
