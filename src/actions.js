export const updateText = (text) => ({
    type: 'UPDATE_TEXT',
    payload: text
  });
  
  export const calculateStats = (input, words, startTime) => {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000 / 60; // Время в минутах
  
    const inputWords = input.trim().split(' ').filter(word => word.length > 0);
    const correctWords = inputWords.filter((word, index) => word === words[index]).length;
    const incorrectWords = inputWords.filter((word, index) => word !== words[index]).length;
    const wpm = Math.floor((correctWords / elapsedTime));
  
    return {
      type: 'CALCULATE_STATS',
      payload: { correct: correctWords, incorrect: incorrectWords, wpm }
    };
  };
  