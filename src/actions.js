export const updateText = (text) => ({
    type: 'UPDATE_TEXT',
    payload: text
  });
  
  export const calculateStats = (input, words, startTime) => {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000 / 60; // Время в минутах
  
    const inputChars = input.split('');
    const wordChars = words.join(' ').split('');
    const correctChars = inputChars.filter((char, index) => char === wordChars[index]).length;
    const incorrectChars = inputChars.length - correctChars;
    const wpm = Math.floor((correctChars / 5) / elapsedTime);
  
    return {
      type: 'CALCULATE_STATS',
      payload: { correct: correctChars, incorrect: incorrectChars, wpm }
    };
  };
  