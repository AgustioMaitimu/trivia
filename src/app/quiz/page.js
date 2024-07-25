'use client';

import React, { useEffect, useState } from 'react';

function Quiz() {
  const [triviaExists, setTriviaExists] = useState(false);

  useEffect(() => {
    const trivia = localStorage.getItem('tio-trivia-login');
    if (trivia) {
      setTriviaExists(true);
    }
  }, []);

  return <div>{triviaExists ? <div>Yes</div> : <div>No</div>}</div>;
}

export default Quiz;
