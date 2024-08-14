import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateStats, updateText } from '../actions';

const TypingArea = () => {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const dispatch = useDispatch();
  const words = useSelector(state => state.words.join(' '));
  const requestRef = useRef();
  const textareaRef = useRef(null);  
  const textContainerRef = useRef(null); 

  const handleChange = (e) => {
    if (!startTime) {
      setStartTime(new Date().getTime());
    }
    const userInput = e.target.value;
    setInput(userInput);
    dispatch(updateText(userInput));
  };

  const handleRestart = () => {
    dispatch({ type: 'RESET_WORDS' }); 
    setInput(''); 
    setStartTime(null);  
    textareaRef.current.focus();
  };

  const renderText = () => {
    return words.split('').map((char, index) => {
      let color;
      if (input[index] === undefined) {
        color = 'gray';  // Светло-серый цвет для невведенных символов
      } else if (input[index] === char) {
        color = 'green';  // Зеленый цвет для правильных символов
      } else {
        color = 'red';  // Красный цвет для неправильных символов
      }

      // Добавляем курсор в нужную позицию
      const isCursorHere = index === input.length;

      return (
        <span key={index} style={{ color, position: 'relative' }}>
          {isCursorHere && (
            <span
              style={{
                position: 'absolute',
                left: '-1px',
                top: '0',
                width: '2px',
                height: '1em',
                backgroundColor: 'black',
                animation: 'blink 1s step-end infinite',
              }}
            />
          )}
          {char}
        </span>
      );
    });
  };

  useEffect(() => {
    if (textContainerRef.current && textareaRef.current) {
      const { width, height,  left } = textContainerRef.current.getBoundingClientRect();
      textareaRef.current.style.width = `${width}px`;
      textareaRef.current.style.height = `${height}px`;
      textareaRef.current.style.left = `${left}px`;
    }
  }, [words]);

  const updateStats = useCallback(() => {
    if (startTime) {
      dispatch(calculateStats(input, words.split(' '), startTime));
    }
    requestRef.current = requestAnimationFrame(updateStats);
  }, [input, words, startTime, dispatch]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateStats);
    return () => cancelAnimationFrame(requestRef.current);
  }, [updateStats]);

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: 'monospace', 
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <div 
        ref={textContainerRef}
        style={{ 
          fontSize: '24px', 
          lineHeight: '1.5', 
          margin: 0, 
          textAlign: 'left',
          whiteSpace: 'pre-wrap', 
          width: '100%', 
          maxWidth: '800px',
          wordWrap: 'break-word',
        }}
      >
        {renderText()}
      </div>
      <textarea
        ref={textareaRef} 
        value={input}
        onChange={handleChange}
        style={{
          position: 'absolute',
          fontSize: '24px',
          lineHeight: '1.5',
          opacity: 0,  
          caretColor: 'transparent', 
          background: 'transparent', 
          border: 'none', 
          outline: 'none',  
          resize: 'none',  
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',  
          overflow: 'hidden',  
        }}
      />
      <button onClick={handleRestart} style={{ 
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '10px 20px', 
        fontSize: '16px',
        zIndex: 1,
      }}>
        Restart
      </button>
    </div>
  );
};

export default TypingArea;
