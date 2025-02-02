import React from 'react';
import { useSelector } from 'react-redux';

const Statistics = () => {
  const { correct, incorrect, wpm } = useSelector(state => state.stats);

  return (
    <div style={{ textAlign: 'center', fontSize: '1.5em' }}>
      <p>Correct: {correct}</p>
      <p>Incorrect: {incorrect}</p>
      <p>WPM: {wpm}</p>
    </div>
  );
};

export default Statistics;
