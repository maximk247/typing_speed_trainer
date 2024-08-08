import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateText, calculateStats } from '../actions';

const TypingArea = () => {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const dispatch = useDispatch();
  const words = useSelector(state => state.words);
  const requestRef = useRef();

  const handleChange = (e) => {
    if (!startTime) {
      setStartTime(new Date().getTime());
    }
    setInput(e.target.value);
    dispatch(updateText(e.target.value));
  };

  const updateStats = () => {
    if (startTime) {
      dispatch(calculateStats(input, words, startTime));
    }
    requestRef.current = requestAnimationFrame(updateStats);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateStats);
    return () => cancelAnimationFrame(requestRef.current);
  }, [input, words, startTime, dispatch]);

  return (
    <div>
      <p>{words.join(' ')}</p>
      <textarea value={input} onChange={handleChange} />
    </div>
  );
};

export default TypingArea;
