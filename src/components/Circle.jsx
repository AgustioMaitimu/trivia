'use client';

import React, { useEffect, useRef } from 'react';

function Circle() {
  const pRef = useRef();

  useEffect(() => {
    const str = "Tio's Trivia - True or False - ";
    const pElement = pRef.current;

    for (let i = 0; i < str.length; i++) {
      let span = document.createElement('span');
      span.innerHTML = str[i];
      pElement.appendChild(span);
      span.style.transform = `rotate(${i * 11.4}deg)`;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newDuration = Math.max(1, 8 - scrollPosition / 250);
      pElement.style.animationDuration = `${newDuration}s`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div ref={pRef} className="circle"></div>;
}

export default Circle;
