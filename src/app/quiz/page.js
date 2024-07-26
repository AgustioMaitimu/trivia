'use client';

import Loading from '@/components/quiz/Loading';
import QuizMain from '@/components/quiz/QuizMain';
import Redirect from '@/components/quiz/Redirect';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

function Quiz() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('tios-trivia')) {
      localStorage.setItem('tios-trivia', JSON.stringify({}));
    }

    if (status === 'loading') {
      return;
    }

    if (!session) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [session, status]);

  if (loading) {
    return <Loading />;
  }

  return session ? <QuizMain /> : <Redirect />;
}

export default Quiz;
